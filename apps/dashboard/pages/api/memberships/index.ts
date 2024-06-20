import { NextApiResponse } from 'next';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import generateFunId from '@chatvolt/lib/generate-fun-id';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import uuidv4 from '@chatvolt/lib/uuidv4';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const getMemberships = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const session = req.session;

  const memberships = await prisma.membership.findMany({
    where: {
      organizationId: session?.organization?.id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return memberships;
};

handler.get(respond(getMemberships));

export default handler;
