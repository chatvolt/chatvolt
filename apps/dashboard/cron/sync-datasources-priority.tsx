import { DatasourceType } from '@prisma/client';
import pMap from 'p-map';

import logger from '@chatvolt/lib/logger';
import triggerTaskLoadDatasource from '@chatvolt/lib/trigger-task-load-datasource';
import { prisma } from '@chatvolt/prisma/client';

(async () => {
  logger.info(`Starting cron job: Sync PRIORITY Datasources`);

  const datasources = await prisma.appDatasource.findMany({
    where: {
      group: {
        // do not include datasource part of a group as the group will handle the sync
        is: null,
      },
      type: {
        in: [
          DatasourceType.google_drive_folder,
          DatasourceType.google_drive_file,
          DatasourceType.notion,
          DatasourceType.notion_page,
          DatasourceType.web_page,
          DatasourceType.web_site,
        ],
      },
      organization: {
        subscriptions: {
          some: {
            status: {
              in: ['active', 'trialing'],
            },
          },
        },
      },

      datastore: { //Sites - RS Agro
          id: {
            in: ['clw8a9qni000514hzte3621kn'],
          },
      },

    },
    select: {
      id: true,
      organizationId: true,
    },
  });

  logger.info(`Triggering synch PRIORITY for ${datasources.length} datasources`);

  await triggerTaskLoadDatasource(
    datasources.map((each) => ({
      organizationId: each.organizationId!,
      datasourceId: each.id!,
      priority: 100000,
    }))
  );

  logger.info(`Finished cron job: Sync PRIORITY Datasources`);

  process.exit(0);
})();
