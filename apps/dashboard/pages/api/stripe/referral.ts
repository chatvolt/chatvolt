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
  referralId: z.string().min(1),
  utmParams: z.any(),
});

export const referral = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const checkoutSessionId = req.body.checkoutSessionId as string;
  const referralId = req.body.referralId as string;
  const utmParams = (req.body.utmParams || {}) as any;

  req.logger.info(req.body);

  const data = await stripe.checkout.sessions.retrieve(checkoutSessionId);

  const customerId = data.customer as string;

  await stripe.customers.update(customerId, {
    metadata: {
      ...utmParams,
      referral: referralId,
    },
  });

  return referralId;
};

handler.post(
  validate({
    body: Schema,
    handler: respond(referral),
  })
);

export default handler;
