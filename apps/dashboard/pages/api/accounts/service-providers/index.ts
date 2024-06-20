import { NextApiResponse } from 'next';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import { ServiceProviderType } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const getServiceProviders = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const session = req.session;
  const type = req.query.type as ServiceProviderType;

  const providers = await prisma.serviceProvider.findMany({
    where: {
      AND: [
        {
          organizationId: session?.organization?.id,
        },
        ...(type ? [{ type }] : []),
      ],
    },
  });

  return providers;
};

handler.get(respond(getServiceProviders));

export default handler;
