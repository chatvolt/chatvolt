import { NextApiResponse } from 'next';
import pMap from 'p-map';
import pRetry from 'p-retry';
import { z } from 'zod';

import { deleteFolderFromS3Bucket } from '@chatvolt/lib/aws';
import bulkDeleteDatasources from '@chatvolt/lib/bulk-delete-datasources';
import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { DatastoreManager } from '@chatvolt/lib/datastores';
import { DatasourceLoader } from '@chatvolt/lib/loaders';
import refreshStoredTokensUsage from '@chatvolt/lib/refresh-stored-tokens-usage';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import validate from '@chatvolt/lib/validate';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const BulkDeleteDatasourcesSchema = z.object({
  datastoreId: z.string(),
  ids: z.array(z.string()),
});

export type BulkDeleteDatasourcesSchema = z.infer<
  typeof BulkDeleteDatasourcesSchema
>;

export const bulkDelete = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const data = req.body as BulkDeleteDatasourcesSchema;
  const session = req.session;

  const datastore = await prisma.datastore.findUnique({
    where: {
      id: data.datastoreId,
    },
  });

  if (datastore?.organizationId !== session?.organization?.id) {
    throw new Error('Unauthorized');
  }

  const datasources = await prisma.appDatasource.findMany({
    where: {
      id: {
        in: data.ids,
      },
    },
    select: {
      id: true,
      organizationId: true,
      datastoreId: true,
      children: {
        select: {
          id: true,
        },
      },
    },
  });

  for (const { id, datastoreId } of datasources) {
    if (datastore.id !== datastoreId) {
      throw new Error('Unauthorized');
    }
  }

  const ids = datasources
    .map((datasource) => [
      datasource.id,
      ...datasource.children.map((child) => child.id),
    ])
    .flat();

  const deleted = await bulkDeleteDatasources({
    datastoreId: datastore.id,
    datasourceIds: ids,
  });

  await refreshStoredTokensUsage(datastore.organizationId!);

  return deleted.count;
};

handler.post(
  validate({
    body: BulkDeleteDatasourcesSchema,
    handler: respond(bulkDelete),
  })
);

export default handler;
