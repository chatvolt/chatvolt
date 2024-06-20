import { NextApiResponse } from 'next';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import { ConversationChannel } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const countUnread = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const session = req.session;

  const count = await prisma.conversation.count({
    where: {
      agent: {
        organizationId: session?.organization?.id,
      },
      // channel: {
      //   notIn: [ConversationChannel.dashboard],
      // },
      messages: {
        some: {
          read: false,
        },
      },
    },
  });

  return count;
};

handler.get(respond(countUnread));

export default handler;
