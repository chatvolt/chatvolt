import { NextApiResponse } from 'next';
import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import validate from '@chatvolt/lib/validate';
import {
  AddServiceProviderWhatsappSchema,
  ServiceProviderWhatsapp,
} from '@chatvolt/lib/types/dtos';

import defaultAddServiceProvider from '../../_utils/default-add-service-provider';
import { z } from 'zod';
import prisma from '@chatvolt/prisma/client';
import cuid from 'cuid';

const handler = createAuthApiHandler();

const createCredentials = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const data = AddServiceProviderWhatsappSchema.parse(req.body);

  return defaultAddServiceProvider<ServiceProviderWhatsapp['config']>({
    type: 'whatsapp',
    session: req.session,
    accessToken: data.accessToken,
    externalId: data.config.phoneNumberId,
    config: {
      ...data.config,
      webhookVerifyToken: cuid(),
    },
    agentId: data.agentId,
    validate: async (config) => {
      const found = await prisma.serviceProvider.findUnique({
        where: {
          unique_external_id: {
            externalId: config.phoneNumberId,
            type: 'whatsapp',
          },
        },
      });

      return !found;
    },
  });
};

handler.post(
  validate({
    handler: respond(createCredentials),
    body: AddServiceProviderWhatsappSchema,
  })
);

export default handler;
