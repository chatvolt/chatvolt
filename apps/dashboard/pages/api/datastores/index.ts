import Cors from 'cors';
import { NextApiResponse } from 'next';

import { ApiError, ApiErrorType } from '@chatvolt/lib/api-error';
import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import generateFunId from '@chatvolt/lib/generate-fun-id';
import runMiddleware from '@chatvolt/lib/run-middleware';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import {
  CreateDatastoreRequestSchema,
  UpdateDatastoreRequestSchema,
} from '@chatvolt/lib/types/dtos';
import uuidv4 from '@chatvolt/lib/uuidv4';
import validate from '@chatvolt/lib/validate';
import { DatastoreVisibility } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'],
});

const handler = createAuthApiHandler();

export const getDatastores = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const { frontend = 'false' } = req.query; // Adicione o parâmetro frontend
  const session = req.session;

  const datastores = await prisma.datastore.findMany({
    where: {
      organizationId: session?.organization?.id,
    },
    include: {
      _count: {
        select: {
          datasources: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 100,
  });

  if (frontend === 'true') {
    const datastoresWithAgentInfo = await Promise.all(
      datastores.map(async (datastore) => {
        const agents = await prisma.agent.findMany({
          where: {
            tools: {
              some: {
                datastoreId: datastore.id,
              },
            },
          },
          select: {
            name: true,
          },
        });
        return {
          ...datastore,
          agentCount: agents.length,
          agentNames: agents.map(agent => agent.name).join(', '),
        };
      })
    );
    return datastoresWithAgentInfo;
  } else {
    return datastores;
  }
};

handler.get(respond(getDatastores));

export const createDatastore = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  let data = req.body as CreateDatastoreRequestSchema;
  const session = req.session;
  const name = data.name || generateFunId();

  return prisma.datastore.create({
    data: {
      type: data.type,
      name,
      description: data.description,
      visibility: data.isPublic
        ? DatastoreVisibility.public
        : DatastoreVisibility.private,
      organization: {
        connect: {
          id: session?.organization?.id,
        },
      },
      config: {},
      apiKeys: {
        create: {
          key: uuidv4(),
        },
      },
      pluginName: data.pluginName || name?.substring(0, 20),
      pluginDescriptionForHumans: `About ${
        data.pluginDescriptionForHumans || name?.substring(0, 90)
      }`,
      pluginDescriptionForModel: `Plugin for searching informations about ${name} to find answers to questions and retrieve relevant information. Use it whenever a user asks something that might be related to ${name}.`,
    },
  });
};

handler.post(
  validate({
    body: CreateDatastoreRequestSchema,
    handler: respond(createDatastore),
  })
);

export default async function wrapper(
  req: AppNextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  return handler(req, res);
}
