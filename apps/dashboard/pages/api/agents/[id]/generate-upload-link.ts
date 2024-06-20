// Not Usede ATM. But keeping it for reference in case we implement file uploading later

import { NextApiResponse } from 'next';
import { z } from 'zod';

import { ApiError, ApiErrorType } from '@chatvolt/lib/api-error';
import { s3 } from '@chatvolt/lib/aws';
import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import { GenerateUploadLinkRequest } from '@chatvolt/lib/types/dtos';
import validate from '@chatvolt/lib/validate';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

const GenerateUploadLinkRequestSchema = GenerateUploadLinkRequest.extend({
  type: z.enum([
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/avif',
    'image/apng',
    'image/svg+xml',
    'image/webp',
  ]),
});

export const generateUploadLink = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const data = req.body as z.infer<typeof GenerateUploadLinkRequestSchema>;
  const session = req.session;
  const id = req.query.id as string;

  const agent = await prisma.agent.findUnique({
    where: {
      id,
    },
  });

  if (agent?.organizationId !== session?.organization?.id) {
    throw new ApiError(ApiErrorType.UNAUTHORIZED);
  }

  const param = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: `agents/${agent?.id!}/${data.fileName}`,
    Expires: 900,
    ContentType: data.type,
  };

  return s3.getSignedUrlPromise('putObject', param);
};

handler.post(
  validate({
    body: GenerateUploadLinkRequestSchema,
    handler: respond(generateUploadLink),
  })
);

export default handler;
