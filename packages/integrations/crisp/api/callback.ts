import { NextApiResponse } from 'next/types';
import { AppNextApiRequest } from '@chatvolt/lib/types';
export default function callback(req: AppNextApiRequest, res: NextApiResponse) {
  return 'callback';
}
