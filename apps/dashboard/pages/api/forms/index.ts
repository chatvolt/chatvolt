import { Prisma } from '@prisma/client';
import Cors from 'cors';
import cuid from 'cuid';
import { NextApiResponse } from 'next';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { formToJsonSchema } from '@chatvolt/lib/forms';
import generateFunId from '@chatvolt/lib/generate-fun-id';
import cors from '@chatvolt/lib/middlewares/cors';
import pipe from '@chatvolt/lib/middlewares/pipe';
import runMiddleware from '@chatvolt/lib/run-middleware';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import { CreateFormSchema, FormFieldSchema } from '@chatvolt/lib/types/dtos';
import validate from '@chatvolt/lib/validate';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const getForms = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const session = req.session;
  const published = req.query.published === 'true';

  const forms = await prisma.form.findMany({
    where: {
      organizationId: session?.organization?.id,
      ...(published
        ? {
            publishedConfig: {
              not: Prisma.AnyNull,
            },
          }
        : {}),
    },
    include: {
      _count: {
        select: {
          submissions: true,
          conversations: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return forms;
};

handler.get(respond(getForms));

export const createForm = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const data = CreateFormSchema.parse(req.body);
  const organizationId = req.session.organization.id as string;
  const formId = cuid();

  return prisma.form.create({
    data: {
      id: formId,
      name: data.name || generateFunId(),
      organization: {
        connect: {
          id: organizationId,
        },
      },
      draftConfig: {
        ...data.draftConfig,
        schema: formToJsonSchema(
          data?.draftConfig?.fields as FormFieldSchema[]
        ),
      } as any,
      agent: {
        create: {
          hidden: true,
          restrictKnowledge: false,
          useMarkdown: false,
          useLanguageDetection: false,
          visibility: 'public',
          name: 'Hidden Agent',
          description: "Form's hidden agent",
          organizationId: organizationId,
          tools: {
            create: {
              type: 'form',
              formId: formId,
            },
          },
        },
      },
    },
  });
};

handler.post(
  validate({
    body: CreateFormSchema,
    handler: respond(createForm),
  })
);

export default pipe(cors({ methods: ['GET', 'POST', 'HEAD'] }), handler);
