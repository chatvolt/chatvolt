import { NextApiResponse } from 'next';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const getMessage = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const session = req.session;
  const messageId = req.query.messageId as string;
  const cursor = req.query.cursor as string;

  const message = await prisma.message.findUnique({
    where: {
      id: messageId,
    },
    include: {
      conversation: {
        include: {
          agent: {
            include: {
              tools: {
                include: {
                  datastore: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return message;
};

handler.get(respond(getMessage));

export default handler;
