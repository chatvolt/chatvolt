import { NextApiResponse } from 'next';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import cors from '@chatvolt/lib/middlewares/cors';
import pipe from '@chatvolt/lib/middlewares/pipe';
import runMiddleware from '@chatvolt/lib/run-middleware';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import {
  CreateContactSchema,
  CreateFormSchema,
  FormFieldSchema,
} from '@chatvolt/lib/types/dtos';
import validate from '@chatvolt/lib/validate';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const getContacts = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const session = req.session;

  const offset = parseInt((req.query.offset as string) || '0');
  const limit = parseInt((req.query.limit as string) || '100');
  const search = req.query.search as string;

  const [contacts, count] = await Promise.all([
    await prisma.contact.findMany({
      where: {
        organizationId: session?.organization?.id,

        ...(search
          ? {
              email: {
                contains: search,
              },
            }
          : {}),
      },
      skip: offset * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    await prisma.contact.count({
      where: {
        organizationId: session?.organization?.id,

        ...(search
          ? {
              email: {
                contains: search,
              },
            }
          : {}),
      },
    }),
  ]);

  return { contacts, count };
};

handler.get(respond(getContacts));

export const createContact = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const data = CreateContactSchema.parse(req.body);
  const organizationId = req.session.organization.id as string;

  const { conversationId, ...otherProps } = data;

  return prisma.contact.create({
    data: {
      ...otherProps,
      ...(conversationId
        ? {
            conversations: {
              connect: {
                id: conversationId,
                organizationId: organizationId,
              },
            },
          }
        : {}),
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

handler.post(
  validate({
    body: CreateFormSchema,
    handler: respond(createContact),
  })
);

export default pipe(cors({ methods: ['GET', 'POST', 'HEAD'] }), handler);
