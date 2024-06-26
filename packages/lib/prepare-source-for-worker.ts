import { AppDatasource } from '@chatvolt/prisma';

import { s3 } from './aws';

const prepareSourceForWorker = (props: {
  datastoreId: string;
  datasourceId: string;
  text: string;
}) => {
  return s3
    .putObject({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: `datastores/${props.datastoreId}/${props.datasourceId}/${props.datasourceId}.txt`,
      Body: props.text,
      CacheControl: 'no-cache',
      ContentType: 'text/plain',
    })
    .promise();
};

export default prepareSourceForWorker;
