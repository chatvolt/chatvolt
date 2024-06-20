import Redis from 'ioredis';

import { WorkerPro } from '@chatvolt/lib/bullmq-pro';
import logger from '@chatvolt/lib/logger';
import taskLoadDatasource from '@chatvolt/lib/task-load-datasource';
import { TaskQueue } from '@chatvolt/lib/types';
import { TaskLoadDatasourceRequestSchema } from '@chatvolt/lib/types/dtos';
import { DatasourceStatus } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const connection = new Redis(process.env.REDIS_URL!);

const datasourceLoadQueue = new WorkerPro(
  TaskQueue.load_datasource,
  async (job) => {
    const data = job?.data as TaskLoadDatasourceRequestSchema;
    try {
      logger.info(data);

      await taskLoadDatasource(data);

      return;
    } catch (err) {
      // TODO: handle error
      logger.error(err);

      await prisma.appDatasource.update({
        where: {
          id: data?.datasourceId,
        },
        data: {
          status: DatasourceStatus.error,
        },
      });

      throw new Error(JSON.stringify(err));
    }
  },
  {
    connection: connection as any,
    concurrency: 5,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
    lockDuration: 60000 * 3, // 3 mins https://github.com/taskforcesh/bullmq/issues/489#issuecomment-835747320,
  }
);

export default datasourceLoadQueue;
