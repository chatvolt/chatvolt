import { NextApiResponse } from 'next';

import { sessionOrganizationInclude } from '@chatvolt/lib/auth';
import {
  createAuthApiHandler,
  respond,
} from '@chatvolt/lib/createa-api-handler';
import generateFunId from '@chatvolt/lib/generate-fun-id';
import { AppNextApiRequest } from '@chatvolt/lib/types';
import uuidv4 from '@chatvolt/lib/uuidv4';
import { prisma } from '@chatvolt/prisma/client';

const handler = createAuthApiHandler();

export const getOrganizations = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const session = req.session;

  // const organizations = await prisma.organization.findMany({
  //   where: {
  //     memberships: {
  //       every: {
  //         userId: session?.user?.id!,
  //       },
  //     },
  //   },
  //   include: {
  //     ...sessionOrganizationInclude,
  //   },
  // });

  const memberships = await prisma.membership.findMany({
    where: {
      userId: session?.user?.id!,
    },
    include: {
      organization: {
        include: sessionOrganizationInclude,
      },
    },
  });

  return memberships.map((m) => m.organization);
};

handler.get(respond(getOrganizations));

export const createOrg = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const session = req.session;

  const org = await prisma.organization.create({
    data: {
      name: generateFunId(),
      memberships: {
        create: {
          role: 'OWNER',
          user: {
            connect: {
              id: session?.user?.id,
            },
          },
        },
      },
      usage: {
        create: {},
      },
      apiKeys: {
        create: {
          key: uuidv4(),
        },
      },
    },
  });

  return org;
};

handler.post(respond(createOrg));

export default handler;
