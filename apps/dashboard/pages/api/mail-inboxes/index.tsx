import { Prisma } from '@prisma/client';
import cuid from 'cuid';
import { NextApiResponse } from 'next';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { formToJsonSchema } from '@chatvolt/lib/forms';
import generateFunId from '@chatvolt/lib/generate-fun-id';
import cors from '@chatvolt/lib/middlewares/cors';
import pipe from '@chatvolt/lib/middlewares/pipe';
import runMiddleware from '@chatvolt/lib/run-middleware';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import {
  CreateMailInboxSchema,
  FormFieldSchema,
} from '@chatvolt/lib/types/dtos';
import validate from '@chatvolt/lib/validate';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

// const cors = Cors({
//   methods: ['POST', 'HEAD'],
// });

export const getEmailInboxes = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const session = req.session;

  const inboxes = await prisma.mailInbox.findMany({
    where: {
      organizationId: session?.organization?.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return inboxes;
};

handler.get(respond(getEmailInboxes));

export const createEmailInbox = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const data = CreateMailInboxSchema.parse(req.body);
  const organizationId = req.session.organization.id as string;
  const formId = cuid();

  return prisma.mailInbox.create({
    data: {
      id: formId,
      name: data.name || generateFunId(),
      alias: data.alias || generateFunId(),
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

handler.post(
  validate({
    body: CreateMailInboxSchema,
    handler: respond(createEmailInbox),
  })
);

export default pipe(cors({ methods: ['GET', 'HEAD'] }), handler);
