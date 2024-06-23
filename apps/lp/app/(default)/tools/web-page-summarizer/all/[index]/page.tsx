import { Metadata, ResolvingMetadata } from 'next';
import { cache } from 'react';
import React from 'react';

import { youtubeSummaryTool } from '@chatvolt/lib/config';
import { Prisma } from '@chatvolt/prisma';
import prisma from '@chatvolt/prisma/client';
import Cta from '@chatvolt/ui/lp/cta';

import Section from '@/components/ui/section';
import AllPagination from '@/components/web-page-summarizer/all-pagination';

export async function generateMetadata(
  {
    params,
  }: {
    params: {
      index: string;
    };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const index = Number(params.index);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `All: Page ${index} - AI News | Chatvolt`,
    description: 'Get the latest AI news before anyone else.',
    alternates: {
      canonical: `/tools/youtube-summarizer/all/${index}`,
    },
    icons: {
      icon: '/images/logo.png',
    },
    keywords: [
      'YouTube Video Summarizer',
      'AI Video Summarizer',
      'Free Video Summarizer',
      'Free YouTube Video Summarizer',
      'AI YouTube Video Summarizer',
    ],
    openGraph: {
      images: [...previousImages],
    },
  };
}

const getPage = cache(async (page: number) => {
  const [total, items] = await Promise.all([
    prisma.lLMTaskOutput.count({
      where: {
        type: 'web_page_summary',
        output: {
          path: ['metadata', 'title'],
          not: Prisma.AnyNull,
        },
      },
    }),
    prisma.lLMTaskOutput.findMany({
      where: {
        type: 'web_page_summary',
        output: {
          path: ['metadata', 'title'],
          not: Prisma.AnyNull,
        },
      },
      skip: Number(page) * youtubeSummaryTool.paginationLimit,
      take: youtubeSummaryTool.paginationLimit,
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ]);

  return {
    total,
    items,
  };
});

export default async function All(props: {
  params: {
    index: string;
  };
}) {
  const index = Number(props.params.index);

  const page = await getPage(index);

  return (
    <Section>
      <AllPagination index={index} {...page} />
      <Cta />
    </Section>
  );
}
