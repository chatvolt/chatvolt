import Cors from 'cors';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { parseDocument } from 'yaml';

import { apiUrl } from '@chatvolt/lib/config';
import { createApiHandler } from '@chatvolt/lib/createa-api-handler';
import getSubdomain from '@chatvolt/lib/get-subdomain';
import runMiddleware from '@chatvolt/lib/run-middleware';
import { AppNextApiRequest } from '@chatvolt/lib/types/index';
import validate from '@chatvolt/lib/validate';
import { prisma } from '@chatvolt/prisma/client';

const cors = Cors({
  methods: ['POST', 'HEAD', 'GET'],
});

const handler = createApiHandler();

export const generateOpenApiYaml = async (
  req: AppNextApiRequest,
  res: NextApiResponse
) => {
  const host = req?.headers?.['host'];
  const subdomain = getSubdomain(host!);

  if (!subdomain) {
    return res.status(400).send('Missing subdomain');
  }

  const datastore = await prisma.datastore.findUnique({
    where: {
      id: subdomain,
    },
  });

  if (!datastore) {
    return res.status(404).send('Not found');
  }

  const file = fs.readFileSync(
    path.resolve(process.cwd(), 'base.openapi.yaml'),
    'utf8'
  );
  const doc = parseDocument(file);

  doc.setIn(['info', 'title'], datastore.name);
  doc.setIn(['info', 'description'], datastore.description);
  doc.setIn(
    ['info', 'servers', 0, 'url'],
    `${apiUrl}/datastores/query/${datastore.id}`
    // `http://localhost:3000`
  );

  const str = doc
    .toString()
    .replace('/DATASTORE_QUERY_PATH', `/datastores/query/${datastore.id}`);

  res.setHeader('Content-Type', 'text/x-yaml');

  return res.send(str);
};

handler.get(generateOpenApiYaml);

export default async function wrapper(
  req: AppNextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  return handler(req, res);
}
