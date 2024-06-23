import { NextApiResponse } from 'next';

import { ApiError, ApiErrorType } from '@chatvolt/lib/api-error';
import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import cors from '@chatvolt/lib/middlewares/cors';
import pipe from '@chatvolt/lib/middlewares/pipe';
import roles from '@chatvolt/lib/middlewares/roles';
import { CheckAliasAvailabilitySchema } from '@chatvolt/lib/types/dtos';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import validate from '@chatvolt/lib/validate';
import { MembershipRole } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const checkAliasAvailability = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const data = CheckAliasAvailabilitySchema.parse(req.body);

  const reservedAliases = [
    'marcos',
    'franklin',
    'chatvolt',
    'blalbaform',
    'inbox',
    'spam',
    'trash',
    'sent',
    'noreply',
    'test',
  ];

  if (reservedAliases.includes(data.alias)) {
    return {
      available: false,
    };
  }

  const item = await prisma.mailInbox.findUnique({
    where: {
      alias: data.alias,
    },
  });

  return {
    available: !item,
  };
};

handler.post(
  validate({
    body: CheckAliasAvailabilitySchema,
    handler: respond(checkAliasAvailability),
  })
);

// export default pipe(cors({ methods: ['POST', 'HEAD'] }), handler);
export default handler;
