import { NextApiResponse } from 'next';

import { ApiError, ApiErrorType } from '@chatvolt/lib/api-error';
import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { formToJsonSchema } from '@chatvolt/lib/forms';
import cors from '@chatvolt/lib/middlewares/cors';
import pipe from '@chatvolt/lib/middlewares/pipe';
import roles from '@chatvolt/lib/middlewares/roles';
import {
  FormFieldSchema,
  UpdateAgentSchema,
  UpdateFormSchema,
} from '@chatvolt/lib/types/dtos';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import validate from '@chatvolt/lib/validate';
import { MembershipRole } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';
const handler = createAuthApiHandler();

export const updateForm = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const updates = UpdateFormSchema.parse(req.body);
  const id = req.query.formId as string;

  const draftConfig = {
    ...updates.draftConfig,
    schema: formToJsonSchema(updates?.draftConfig?.fields as FormFieldSchema[]),
  };

  return prisma.form.update({
    where: {
      id,
    },
    data: {
      ...(updates as any),
      draftConfig: draftConfig as any,
    },
  });
};

handler.patch(
  validate({
    body: UpdateAgentSchema,
    handler: respond(updateForm),
  })
);

export default pipe(cors({ methods: ['DELETE', 'PATCH', 'HEAD'] }), handler);
