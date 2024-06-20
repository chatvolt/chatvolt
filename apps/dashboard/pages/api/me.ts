import { NextApiResponse } from 'next';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';

const handler = createAuthApiHandler();

export const me = async (req: AppNextApiRequest, res: NextApiResponse) => {
  const session = req.session;

  return session.organization;
};

handler.get(respond(me));

export default handler;
