import cuid from 'cuid';

import {
  Agent,
  Attachment,
  ConversationChannel,
  ConversationStatus,
  Datastore,
  Message,
  Prisma,
  ServiceProviderType,
  Tool,
} from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

import { Source } from './types/document';
import { ChatResponse, CreateAttachmentSchema } from './types/dtos';
import getRequestLocation from './get-request-location';
import { Prettify } from './type-utilites';

type ToolExtended = Tool & {
  datastore: Datastore | null;
};

export type AgentWithTools = Agent & {
  tools: ToolExtended[];
};

type MessageExtended = Pick<Message, 'from' | 'text'> & {
  id?: string;
  visitorId?: string;
  userId?: string;
  agentId?: string;
  contactId?: string;
  createdAt?: Date;
  sources?: Source[];
  usage?: ChatResponse['usage'];
  approvals?: ChatResponse['approvals'];
  inputId?: string;
  metadata?: Record<PropertyKey, any>;
  attachments?: CreateAttachmentSchema[];
  externalId?: string;
  externalVisitorId?: string;
  conversationStatus?: ConversationStatus;
};

export default class ConversationManager {
  organizationId?: string;
  conversationId?: string;
  channel: ConversationChannel;
  metadata?: Record<PropertyKey, any> = {};
  channelExternalId?: string;
  channelCredentialsId?: string;
  formId?: string;
  location?: Prettify<ReturnType<typeof getRequestLocation>>;

  constructor({
    organizationId,
    channel,
    conversationId,
    metadata,
    channelExternalId,
    channelCredentialsId,
    formId,
    location,
  }: {
    organizationId?: string;
    formId?: string;
    channel: ConversationChannel;
    conversationId?: string;
    metadata?: Record<PropertyKey, any>;
    channelExternalId?: string;
    channelCredentialsId?: string;
    location?: ReturnType<typeof getRequestLocation>;
  }) {
    this.conversationId = conversationId || cuid();
    this.channel = channel;
    this.metadata = metadata;
    this.organizationId = organizationId;
    this.channelExternalId = channelExternalId;
    this.channelCredentialsId = channelCredentialsId;
    this.formId = formId;
    this.location = location;
  }

  async createMessage(message: MessageExtended) {
    const {
      id,
      approvals = [],
      attachments = [],
      inputId,
      userId,
      contactId,
      agentId,
      visitorId,
      externalVisitorId,
      conversationStatus,
      ...rest
    } = message;

    const messageId = id || cuid();

    const CreateMessagePayload = {
      ...rest,
      id: messageId,

      ...(inputId
        ? {
            input: {
              connect: {
                id: inputId,
              },
            },
          }
        : {}),
      ...(userId
        ? {
            user: {
              connect: {
                id: userId,
              },
            },
          }
        : {}),
      ...(agentId
        ? {
            agent: {
              connect: {
                id: agentId,
              },
            },
          }
        : {}),
      ...(visitorId
        ? {
            visitor: {
              connectOrCreate: {
                where: {
                  id: visitorId,
                },
                create: {
                  id: visitorId,
                  organizationId: this.organizationId!,
                  metadata: this.location,
                },
              },
            },
          }
        : {}),
      ...(externalVisitorId && !visitorId
        ? {
            visitor: {
              connectOrCreate: {
                where: {
                  unique_external_id_for_org: {
                    organizationId: this.organizationId!,
                    externalId: externalVisitorId!,
                  },
                },
                create: {
                  organizationId: this.organizationId!,
                  externalId: externalVisitorId!,
                  metadata: this.location,
                },
              },
            },
          }
        : {}),
      ...(contactId
        ? {
            contact: {
              connect: {
                id: contactId,
              },
            },
          }
        : {}),
      ...(approvals.length > 0
        ? {
            approvals: {
              createMany: {
                data: (approvals as ChatResponse['approvals'])?.map(
                  (approval) => ({
                    toolId: approval.tool.id,
                    payload: approval.payload as any,
                    agentId: agentId,
                    organizationId: this.organizationId,
                  })
                ),
              },
            },
          }
        : {}),
      ...(attachments.length > 0
        ? {
            attachments: {
              createMany: {
                data: (attachments || [])?.map((attachment) => ({
                  conversationId: this.conversationId,
                  ...attachment,
                })),
              },
            },
          }
        : {}),
    } satisfies Prisma.MessageCreateInput;

    const ConversationPayload = {
      messages: {
        create: {
          ...CreateMessagePayload,
        },
      },

      ...(this.metadata ? { metadata: this.metadata } : {}),

      ...(conversationStatus ? { status: conversationStatus } : {}),

      ...(this.formId
        ? {
            form: {
              connect: {
                id: this.formId,
              },
            },
          }
        : {}),

      ...(this.channelCredentialsId
        ? {
            channelCredentials: {
              connect: {
                id: this.channelCredentialsId,
              },
            },
          }
        : {}),

      //  Conversation Participants
      ...(contactId
        ? {
            participantsContacts: {
              connect: {
                id: contactId,
              },
            },
          }
        : {}),
      ...(visitorId
        ? {
            participantsVisitors: {
              connectOrCreate: {
                where: {
                  id: visitorId,
                },
                create: {
                  id: visitorId,
                  organizationId: this.organizationId!,
                  metadata: this.location,
                },
              },
            },
          }
        : {}),
      ...(agentId
        ? {
            //  We keep agentId until we migrate conversations to be multi-agent
            agent: {
              connect: {
                id: agentId,
              },
            },
            participantsAgents: {
              connect: {
                id: agentId,
              },
            },
          }
        : {}),
      ...(userId
        ? {
            user: {
              connect: {
                id: userId,
              },
            },
            participantsUsers: {
              connect: {
                id: userId,
              },
            },
          }
        : {}),
    } satisfies Prisma.ConversationUpdateInput;

    // Suponha que organizationId sempre exista e seja um identificador válido.
    if (!this.organizationId) {
      throw new Error('Organization ID is missing or invalid');
    }

    // Determine qual chave usar com base na disponibilidade e valide antes de usar.
    const whereClause = this.channelExternalId
      ? { organizationId: this.organizationId, channelExternalId: this.channelExternalId }
      : { organizationId: this.organizationId, id: this.conversationId };

    if (!whereClause.channelExternalId && !whereClause.id) {
      throw new Error('Neither channelExternalId nor conversationId is available for the upsert operation');
    }

    console.log('zap>>> this.conversationId -------->', this.conversationId );
    console.log('zap>>> this.channel -------->', this.channel );
    console.log('zap>>> this.channelExternalId -------->', this.channelExternalId );
    console.log('zap>>> this.organizationId -------->', this.organizationId );


    return prisma.conversation.upsert({
      where: whereClause,
      create: {
        // Dados para criação, assegurando que todos os campos necessários estão incluídos.
        id: this.conversationId,
        channel: this.channel,
        channelExternalId: this.channelExternalId,
        organization: {
          connect: { id: this.organizationId },
        },
        // Incluir outros campos de 'ConversationPayload' necessários.
        ...(ConversationPayload as Prisma.ConversationCreateInput),
      },
      update: {
        // Dados para atualização.
        ...ConversationPayload,
      },
      include: {
        messages: {
          where: { id: messageId },
        },
      },
    });




  }
}
