import { NextApiResponse } from 'next';

import { ApiError, ApiErrorType } from '@chatvolt/lib/api-error';
import { createApiHandler, respond } from '@chatvolt/lib/createa-api-handler';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import { prisma } from '@chatvolt/prisma/client';

const handler = createApiHandler();

export const cleanFreeAccounts = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const secret = req.query.secret as string;

  if (secret !== process.env.NEXTAUTH_SECRET) {
    throw new ApiError(ApiErrorType.UNAUTHORIZED);
  }

  const result = await prisma.usage.updateMany({
    data: {
      nbAgentQueries: 0,
      nbDataProcessingBytes: 0,
    },
  });

  req.logger.info(`Processed ${result.count} items`);

  return result;
};

handler.get(respond(cleanFreeAccounts));

export default handler;
