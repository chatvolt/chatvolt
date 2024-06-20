import { NextApiResponse } from 'next';

import { ApiError, ApiErrorType } from '@chatvolt/lib/api-error';
import { createApiHandler, respond } from '@chatvolt/lib/createa-api-handler';
import appEventHandlers from '@chatvolt/lib/events/handlers';
import { AppeEventHandlerSchema } from '@chatvolt/lib/types/dtos';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import validate from '@chatvolt/lib/validate';

const handler = createApiHandler();

export const handleEvent = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const { token, event } = AppeEventHandlerSchema.parse(req.body);

  if (token !== process.env.JWT_SECRET) {
    throw new ApiError(ApiErrorType.UNAUTHORIZED);
  }

  return appEventHandlers[event.type](event as any);
};

handler.post(
  validate({
    body: AppeEventHandlerSchema,
    handler: respond(handleEvent),
  })
);

export default handler;
