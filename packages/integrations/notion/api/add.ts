import { NextApiResponse } from 'next';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import prisma from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const getAuthUrl = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const authUrl = `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${process.env.NOTION_CLIENT_ID}&response_type=code&state=${req?.session?.organization?.id}`;

  return authUrl;
};

handler.get(respond(getAuthUrl));
export default handler;
