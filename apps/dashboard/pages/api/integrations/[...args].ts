import { NextApiResponse } from 'next';

import { ApiError, ApiErrorType } from '@chatvolt/lib/api-error';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';

export const integrationHandler = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const args = req.query.args as string[];

  if (!Array.isArray(args)) {
    throw new ApiError(ApiErrorType.NOT_FOUND);
  }

  const [appName, apiEndpoint] = req.query.args as string[];

  const handlerMap = (await import('@chatvolt/integrations/import.server'))
    .default;

  const handlers = await handlerMap?.[appName as keyof typeof handlerMap];
  const endpoint = handlers?.[apiEndpoint as keyof typeof handlers];

  if (!endpoint) {
    throw new ApiError(ApiErrorType.NOT_FOUND);
  }

  await endpoint(req, res);

  if (!res.writableEnded) {
    return res.json({ success: true });
  }
};

export default integrationHandler;
