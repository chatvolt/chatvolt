import Cors from 'cors';
import { NextApiResponse } from 'next';

import { AnalyticsEvents, capture } from '@chatvolt/lib/analytics-server';
import { ApiError, ApiErrorType } from '@chatvolt/lib/api-error';
import {
  createLazyAuthHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import runMiddleware from '@chatvolt/lib/run-middleware';
import { EvalAnswer } from '@chatvolt/lib/types/dtos';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import validate from '@chatvolt/lib/validate';
import { AgentVisibility } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const handler = createLazyAuthHandler();

const cors = Cors({
  methods: ['POST', 'HEAD'],
});

export const evalAnswer = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const session = req.session;
  const data = req.body as EvalAnswer;
  const message = await prisma.message.findUnique({
    where: {
      id: data.messageId,
    },
    include: {
      conversation: {
        include: {
          agent: true,
        },
      },
    },
  });

  if (!message) {
    throw new ApiError(ApiErrorType.NOT_FOUND);
  }

  if (
    message?.conversation?.agent?.visibility === AgentVisibility.private &&
    message?.conversation?.agent?.organizationId !== session?.organization?.id
  ) {
    throw new ApiError(ApiErrorType.UNAUTHORIZED);
  }

  const updated = await prisma.message.update({
    where: {
      id: data.messageId,
    },
    data: {
      eval: data.eval,
    },
  });

  if (session?.user?.id || data.visitorId) {
    capture?.({
      event: AnalyticsEvents.BUTTON_CLICK,
      payload: {
        userId: session?.user?.id || data.visitorId,
        organizationId: session?.organization?.id,
        action: 'Eval Answer',
        value: data.eval,
      },
    });
  }

  return updated;
};

handler.post(
  validate({
    body: EvalAnswer,
    handler: respond(evalAnswer),
  })
);

export default async function wrapper(
  req: AppNextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  return handler(req, res);
}
