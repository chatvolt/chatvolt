import { NextApiRequest, NextApiResponse } from 'next';

import { youtubeSummaryTool } from '@chatvolt/lib/config';
import { Prisma } from '@chatvolt/prisma';
import prisma from '@chatvolt/prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  const baseUrl = 'https://www.chatvolt.ai';

  const count = await prisma.lLMTaskOutput.count({
    where: {
      type: 'youtube_summary',
      output: {
        path: ['metadata', 'title'],
        not: Prisma.AnyNull,
      },
    },
  });

  const nbPages = Math.ceil(count / youtubeSummaryTool.sitemapPageSize);

  const paths = [
    ...new Array(nbPages)
      .fill(0)
      .map(
        (_, index) =>
          `${baseUrl}/api/tools/youtube-summary/sitemap/${index}.xml`
      ),
    `${baseUrl}/api/tools/youtube-summary/sitemap/all.xml`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 

      ${paths
        .map(
          (url) => `<sitemap>
      <loc>${url}</loc>
    </sitemap>`
        )
        .join('\n')}
      </sitemapindex>`;

  res.end(xml);
}
