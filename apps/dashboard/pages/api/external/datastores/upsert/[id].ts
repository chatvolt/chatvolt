import cuid from 'cuid';
import { NextApiResponse } from 'next';

import { ApiError, ApiErrorType } from '@chatvolt/lib/api-error';
import { s3 } from '@chatvolt/lib/aws';
import { createApiHandler, respond } from '@chatvolt/lib/createa-api-handler';
import generateFunId from '@chatvolt/lib/generate-fun-id';
import getSubdomain from '@chatvolt/lib/get-subdomain';
import prepareSourceForWorker from '@chatvolt/lib/prepare-source-for-worker';
import triggerTaskLoadDatasource from '@chatvolt/lib/trigger-task-load-datasource';
import { UpsertRequestSchema } from '@chatvolt/lib/types/dtos';
import { UpsertResponseSchema } from '@chatvolt/lib/types/dtos';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import validate from '@chatvolt/lib/validate';
import {
  DatasourceStatus,
  DatasourceType,
  DatastoreVisibility,
} from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const handler = createApiHandler();

export const upsert = async (req: AppNextApiRequest, res: NextApiResponse) => {
  const datastoreId = req.query.id as string;
  const data = req.body as UpsertRequestSchema;

  // get Bearer token from header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')?.[1];

  if (!datastoreId) {
    throw new ApiError(ApiErrorType.INVALID_REQUEST);
  }

  const datastore = await prisma.datastore.findUnique({
    where: {
      id: datastoreId,
    },
    include: {
      apiKeys: true,
      organization: {
        include: {
          apiKeys: true,
        },
      },
    },
  });

  if (!datastore) {
    throw new ApiError(ApiErrorType.NOT_FOUND);
  }

  if (
    datastore.visibility === DatastoreVisibility.private &&
    (!token ||
      !(
        datastore?.organization?.apiKeys.find((each) => each.key === token) ||
        // TODO REMOVE AFTER MIGRATION
        datastore.apiKeys.find((each) => each.key === token)
      ))
  ) {
    throw new ApiError(ApiErrorType.UNAUTHORIZED);
  }

  const ids = data.documents.map(() => cuid());

  await prisma.appDatasource.createMany({
    data: data.documents.map((each, index) => ({
      id: ids[index],
      type: DatasourceType.text,
      name: each.name || generateFunId(),
      datastoreId: datastore.id,
      status: DatasourceStatus.pending,
      organizationId: datastore.organizationId,
      config: {
        ...each.metadata,
      },
    })),
  });

  const promises = data.documents.map((each, index) => {
    return new Promise(async (resolve, reject) => {
      try {
        await prepareSourceForWorker({
          datasourceId: ids[index],
          datastoreId: datastore?.id,
          text: each.text,
        });
        await triggerTaskLoadDatasource([
          {
            organizationId: datastore?.organization?.id!,
            datasourceId: ids[index],
            priority: 1,
          },
        ]);
      } catch (err) {
        req.logger.error('ERROR TRIGGERING TASK', err);

        await prisma.appDatasource.update({
          where: {
            id: ids[index],
          },
          data: {
            status: DatasourceStatus.error,
          },
        });
      } finally {
        resolve(ids[index]);
      }
    });
  });

  await Promise.all(promises);

  return {
    ids,
  } as UpsertResponseSchema;
};

handler.post(
  validate({
    body: UpsertRequestSchema,
    handler: respond(upsert),
  })
);

export default handler;
