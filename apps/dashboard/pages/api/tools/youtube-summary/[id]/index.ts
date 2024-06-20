import { NextApiResponse } from 'next';

import {
  createLazyAuthHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import cors from '@chatvolt/lib/middlewares/cors';
import pipe from '@chatvolt/lib/middlewares/pipe';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import { LLMTaskOutputType } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const handler = createLazyAuthHandler();

export const getSummary = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const id = req.query.id as string;

  const output = await prisma.lLMTaskOutput.findUnique({
    where: {
      unique_external_id: {
        type: LLMTaskOutputType.youtube_summary,
        externalId: id,
      },
    },
  });

  return output;
};

handler.get(respond(getSummary));

export default pipe(cors({ methods: ['GET', 'HEAD'] }), handler);
