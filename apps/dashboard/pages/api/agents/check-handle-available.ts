import { NextApiResponse } from 'next';
import { z } from 'zod';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import { CreateAgentSchema } from '@chatvolt/lib/types/dtos';
import validate from '@chatvolt/lib/validate';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

const Schema = CreateAgentSchema.pick({ handle: true });

export const checkHandleAvailable = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const { handle } = req.body as z.infer<typeof Schema>;

  const agent = await prisma.agent.findUnique({
    where: {
      handle: handle!,
    },
  });

  const available = !agent;

  return {
    agentId: agent?.id,
    available,
  };
};

handler.post(
  validate({
    body: CreateAgentSchema.pick({ handle: true }),
    handler: respond(checkHandleAvailable),
  })
);

export default handler;
