import axios from 'axios';
import { NextApiResponse } from 'next';

import { ApiError } from '@chatvolt/lib/api-error';
import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import { ServiceProviderType } from '@chatvolt/prisma';
import prisma from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const getServiceProviders = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  try {
    const type = req.query.type as ServiceProviderType;
    const agentId = req.query.agentId as string;

    const providers = await prisma.serviceProvider.findMany({
      where: {
        organizationId: req?.session?.organization?.id as string,
        ...(type ? { type } : {}),
        ...(agentId
          ? {
              agents: {
                some: {
                  AND: {
                    id: agentId,
                    organizationId: req?.session?.organization?.id,
                  },
                },
              },
            }
          : {}),
      },
      include: {
        agents: true,
      },
    });

    return providers;
  } catch (e) {
    if (e instanceof ApiError) {
      throw new Error(e.message);
    }
    throw e;
  }
};

handler.get(respond(getServiceProviders));

export default handler;
