import '@app/workers/datasource-loader';
import '@app/cron/daily-leads';

import { NextApiResponse } from 'next';

import { createApiHandler, respond } from '@chatvolt/lib/createa-api-handler';
import { AppNextApiRequest } from '@chatvolt/lib/types';

const handler = createApiHandler();

export const loadWorkers = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  return {
    hello: 'world',
  };
};

handler.get(respond(loadWorkers));

export default handler;
