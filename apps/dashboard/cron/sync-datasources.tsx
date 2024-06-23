import { DatasourceType } from '@prisma/client';
import pMap from 'p-map';

import logger from '@chatvolt/lib/logger';
import triggerTaskLoadDatasource from '@chatvolt/lib/trigger-task-load-datasource';
import { prisma } from '@chatvolt/prisma/client';

(async () => {
  logger.info(`Starting cron job: Sync Datasources`);

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

        NOT: { //Alex, IA-BrasilAI, FSTech, AmchamAI, MKTSeven, Demonstrações e Herreira
          id: {
            in: ['clvw692rf000bpbr8oz12ffs3', 'clvw7o7h9000npbr83zu1sckt', 'clvwa2fmq0019pbr8tpuagwvs', 'clw6lt2pw0010pb9q4e9clq6a', 'clwasftlm001k143gmjqx2ap6', 'clwtgm5fr0003q9d52nd26f84', 'clx9n1jsc000a10avjvx8ervl'],
          },
        },

      },

      // datastore: { //exclui: Endeavor e IA-BrasilAI
      //   NOT: {
      //     id: {
      //       in: ['clw0m77tc0001qhga9dczercq', 'clvy7z66f001dpbyd93xpjd0p', ],
      //     },
      //   },
      // },

    },
    select: {
      id: true,
      organizationId: true,
    },
  });

  logger.info(`Triggering synch for ${datasources.length} datasources`);

  await triggerTaskLoadDatasource(
    datasources.map((each) => ({
      organizationId: each.organizationId!,
      datasourceId: each.id!,
      priority: 100000,
    }))
  );

  logger.info(`Finished cron job: Sync Datasources`);

  process.exit(0);
})();
