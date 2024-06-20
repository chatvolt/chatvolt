import { NextApiResponse } from 'next';

import { ApiError, ApiErrorType } from '@chatvolt/lib/api-error';
import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import mailer from '@chatvolt/lib/mailer';
import cors from '@chatvolt/lib/middlewares/cors';
import pipe from '@chatvolt/lib/middlewares/pipe';
import roles from '@chatvolt/lib/middlewares/roles';
import { UpdateMailInboxSchema } from '@chatvolt/lib/types/dtos';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import validate from '@chatvolt/lib/validate';
import { MailInbox, MembershipRole } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const getMailInbox = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const id = req.query.id as string;

  const item = await prisma.mailInbox.findUnique({
    where: {
      id,
    },
  });
  if (!item) {
    throw new ApiError(ApiErrorType.NOT_FOUND);
  }

  return item;
};

handler.get(respond(getMailInbox));

export const updateMailInbox = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const id = req.query.id as string;
  const data = UpdateMailInboxSchema.parse(req.body);
  let extraUpdates = {} as Partial<MailInbox>;

  const old = await prisma.mailInbox.findUnique({
    where: {
      id,
    },
  });

  if (old?.alias !== data.alias) {
    // check if new alias available
    const found = await prisma.mailInbox.findUnique({
      where: {
        alias: data.alias,
      },
    });

    if (found) {
      throw new ApiError(ApiErrorType.INVALID_REQUEST);
    }
  }

  if (data.customEmail && old?.customEmail !== data.customEmail) {
    extraUpdates = {
      ...extraUpdates,
      isCustomEmailVerified: false,
    };
  }

  const item = await prisma.mailInbox.update({
    where: {
      id,
    },
    data: {
      ...data,
      ...extraUpdates,
    },
  });
  if (!item) {
    throw new ApiError(ApiErrorType.NOT_FOUND);
  }

  return item;
};

handler.patch(
  pipe(
    validate({
      body: UpdateMailInboxSchema,
      handler: respond(updateMailInbox),
    })
  )
);

export const deleteMailInbox = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const id = req.query.id as string;

  if (!req?.session?.organization?.id) {
    throw new ApiError(ApiErrorType.UNAUTHORIZED);
  }

  const item = await prisma.mailInbox.findUnique({
    where: {
      id,
    },
  });

  if (req?.session?.organization?.id !== item?.organizationId) {
    throw new ApiError(ApiErrorType.UNAUTHORIZED);
  }

  return prisma.mailInbox.delete({
    where: {
      id,
    },
  });
};

handler.delete(
  pipe(
    roles([MembershipRole.ADMIN, MembershipRole.OWNER]),
    respond(deleteMailInbox)
  )
);

export default pipe(cors({ methods: ['GET', 'HEAD'] }), handler);
