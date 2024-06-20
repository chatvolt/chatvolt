import { NextApiResponse } from 'next';

import { ApiError, ApiErrorType } from '@chatvolt/lib/api-error';
import {
  createLazyAuthHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import cors from '@chatvolt/lib/middlewares/cors';
import pipe from '@chatvolt/lib/middlewares/pipe';
import roles from '@chatvolt/lib/middlewares/roles';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import { MembershipRole } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const handler = createLazyAuthHandler();

export const getForm = async (req: AppNextApiRequest, res: NextApiResponse) => {
  const id = req.query.formId as string;

  const existingForm = await prisma.form.findUnique({
    where: {
      id,
    },
  });
  if (!existingForm) {
    throw new ApiError(ApiErrorType.NOT_FOUND);
  }
  return existingForm;
};

handler.get(respond(getForm));

export const deleteForm = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const id = req.query.formId as string;

  if (!req?.session?.organization?.id) {
    throw new ApiError(ApiErrorType.UNAUTHORIZED);
  }

  const form = await prisma.form.findUnique({
    where: {
      id,
    },
  });

  if (req?.session?.organization?.id !== form?.organizationId) {
    throw new ApiError(ApiErrorType.UNAUTHORIZED);
  }

  return prisma.form.delete({
    where: {
      id,
    },
  });
};

handler.delete(
  pipe(roles([MembershipRole.ADMIN, MembershipRole.OWNER]), respond(deleteForm))
);

export default pipe(cors({ methods: ['GET', 'HEAD'] }), handler);
