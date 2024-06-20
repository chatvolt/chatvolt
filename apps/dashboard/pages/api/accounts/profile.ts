import { NextApiResponse } from 'next';

import { sessionUserInclude } from '@chatvolt/lib/auth';
import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { UpdateUserProfileSchema } from '@chatvolt/lib/types/dtos';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import validate from '@chatvolt/lib/validate';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const updateUserProfile = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const session = req.session;

  const { email, ...data } = req.body as UpdateUserProfileSchema;

  const updated = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      ...data,
    },
    include: {
      ...sessionUserInclude,
    },
  });

  return updated;
};

handler.patch(
  validate({
    body: UpdateUserProfileSchema,
    handler: respond(updateUserProfile),
  })
);

export default handler;
