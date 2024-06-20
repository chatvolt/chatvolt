import { Datastore } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const cleanDatastore = async (datastore: Datastore) => {
  await Promise.all([
    prisma.datastore.delete({
      where: {
        id: datastore?.id,
      },
    }),
    // new DatastoreManager(datastore!).delete(),
    // deleteFolderFromS3Bucket(
    //   process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    //   `datastores/${datastore?.id || 'UNKNOWN'}` // add UNKNOWN to avoid to delete all the folder 😅
    // ),
  ]);
};

export default cleanDatastore;
