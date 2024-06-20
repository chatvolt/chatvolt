import { NextApiResponse } from 'next';

import { ApiError, ApiErrorType } from '@chatvolt/lib/api-error';
import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const verifyEmail = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const id = req.query.id as string;
  const token = req.query.token as string;
  const email = req.query.email as string;

  if (!token || !email) {
    throw new ApiError(ApiErrorType.INVALID_REQUEST);
  }

  const item = await prisma.mailInbox.findUnique({
    where: {
      id,
    },
    include: {
      customEmailVerificationToken: true,
    },
  });

  if (!item) {
    throw new ApiError(ApiErrorType.NOT_FOUND);
  }

  const code = item.customEmailVerificationToken?.code;

  if (code && code === token && item.customEmail === email) {
    await prisma.mailInbox.update({
      where: {
        id,
      },
      data: {
        isCustomEmailVerified: true,
        customEmailVerificationToken: {
          delete: true,
        },
      },
    });
  } else {
    throw new ApiError(ApiErrorType.UNAUTHORIZED);
  }

  return res.redirect(
    `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/mail-inboxes/${id}`
  );
};

handler.get(respond(verifyEmail));

export default handler;
