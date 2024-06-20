import { NextApiResponse } from 'next';
import { z } from 'zod';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { stripe } from '@chatvolt/lib/stripe-client';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import validate from '@chatvolt/lib/validate';

const handler = createAuthApiHandler();

const Schema = z.object({
  checkoutSessionId: z.string().min(1),
});

export const getCheckoutSession = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const checkoutSessionId = req.body.checkoutSessionId as string;

  const data = await stripe.checkout.sessions.retrieve(checkoutSessionId);

  return data;
};

handler.post(
  validate({
    body: Schema,
    handler: respond(getCheckoutSession),
  })
);

export default handler;
