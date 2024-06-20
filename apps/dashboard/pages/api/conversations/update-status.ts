import { NextApiResponse } from 'next';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { UpdateStatusAllConversationsSchema } from '@chatvolt/lib/types/dtos';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import validate from '@chatvolt/lib/validate';
import { ConversationChannel } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export async function updateStatus(
  req: AppNextApiRequest,
  res: NextApiResponse
) {
  const session = req.session;
  const data = req.body as UpdateStatusAllConversationsSchema;
  const channel = req.query.channel as ConversationChannel;
  const agentId = req.query.agentId as string;

  const result = await prisma.conversation.updateMany({
    where: {
      organizationId: session?.organization?.id,
      ...(channel ? { channel } : {}),
      ...(agentId ? { agentId } : {}),
    },
    data: {
      status: data.status,
    },
  });

  return {
    count: result.count,
  };
}

handler.post(
  validate({
    handler: respond(updateStatus),
    body: UpdateStatusAllConversationsSchema,
  })
);

export default handler;
