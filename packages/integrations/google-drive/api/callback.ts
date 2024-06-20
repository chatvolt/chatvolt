import { NextApiResponse } from 'next';

import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import { GoogleDriveManager } from '@chatvolt/lib/google-drive-manager';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import { ServiceProviderType } from '@chatvolt/prisma';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const auth = async (req: AppNextApiRequest, res: NextApiResponse) => {
  const session = req.session;
  const code = req.query.code as string;

  const driveManager = await GoogleDriveManager.fromCode(code);

  const userInfo = await driveManager.drive.about.get({
    fields: 'user',
  });

  await prisma.serviceProvider.create({
    data: {
      type: ServiceProviderType.google_drive,
      name: userInfo?.data?.user?.emailAddress,
      accessToken: driveManager.accessToken,
      refreshToken: driveManager.refreshToken,
      organization: {
        connect: {
          id: session?.organization?.id,
        },
      },
    },
  });

  return res.redirect('/close-window');
};

handler.get(auth);

export default handler;
