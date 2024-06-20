import { NextApiResponse } from 'next';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import validate from '@chatvolt/lib/validate';
import { ConversationChannel } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export async function markAllRead(
  req: AppNextApiRequest,
  res: NextApiResponse
) {
  const session = req.session;
  const channel = req.query.channel as ConversationChannel;
  const agentId = req.query.agentId as string;

  const result = await prisma.message.updateMany({
    where: {
      conversation: {
        organizationId: session?.organization?.id,
        ...(channel ? { channel } : {}),
        ...(agentId ? { agentId } : {}),
      },
    },
    data: {
      read: true,
    },
  });

  return {
    count: result.count,
  };
}

handler.post(
  validate({
    handler: respond(markAllRead),
  })
);

export default handler;
