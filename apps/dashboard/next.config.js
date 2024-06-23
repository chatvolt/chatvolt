const path = require('path');
const os = require('os');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const pkg = require('../../package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // assetPrefix: process.env.NEXT_PUBLIC_DASHBOARD_URL,
  reactStrictMode: true,
  output: 'standalone',
  publicRuntimeConfig: {
    version: pkg.version,
  },
  transpilePackages: [
    '@chatvolt/lib',
    '@chatvolt/emails',
    '@chatvolt/ui',
    '@chatvolt/integrations',
  ],
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/signin',
        destination: '/auth/signin',
        permanent: true,
      },
      {
        source: '/',
        destination: '/agents',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'app.chatvolt.ai',
          },
        ],
      },
      {
        source: '/account',
        destination: '/settings/billing',
        permanent: true,
      },
      {
        source: '/settings',
        destination: '/settings/profile',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: 'https://docs.chatvolt.ai/privacy/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: 'https://docs.chatvolt.ai/privacy/terms',
        permanent: true,
      },
      {
        source: '/lgpd',
        destination: 'https://docs.chatvolt.ai/privacy/lgpd',
        permanent: true,
      },
      

    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/integrations/crisp/hooks',
          destination: '/api/integrations/crisp/webhook',
        },
        {
          source: '/api/integrations/crisp/config-update',
          destination: '/api/integrations/crisp/config',
        },

//----------EN:
        {
          source: '/',
          destination: '/use-cases/customer-support',
          has: [{type: 'host', value: 'www.chatvolt.ai'}],
        },
        {
          source: '/',
          destination: '/use-cases/customer-support',
          has: [{type: 'host', value: 'localhost'}],
        },
//---
        {
          source: '/pricing',
          destination: '/use-cases/customer-support/pricing',
          has: [{type: 'host', value: 'www.chatvolt.ai'}],
        },
        {
          source: '/pricing',
          destination: '/use-cases/customer-support/pricing',
          has: [{type: 'host', value: 'localhost'}],
        },

//----------BR:
        {
          source: '/br',
          destination: '/use-cases/customer-support-ptbr',
          has: [{type: 'host', value: 'www.chatvolt.ai'}],
        },
        {
          source: '/br',
          destination: '/use-cases/customer-support-ptbr',
          has: [{type: 'host', value: 'localhost'}],
        },
        //---
        {
          source: '/br/pricing',
          destination: '/use-cases/customer-support-ptbr/pricing',
          has: [{type: 'host', value: 'www.chatvolt.ai'}],
        },
        {
          source: '/br/pricing',
          destination: '/use-cases/customer-support-ptbr/pricing',
          has: [{type: 'host', value: 'localhost'}],
        },
//----------


        {
          source: '/sitemap.xml',
          destination: '/api/sitemaps/chatvolt',
          has: [
            {
              type: 'host',
              value: 'www.chatvolt.ai',
            },
          ],
        },
        {
          source: '/api/tools/youtube-summary/sitemap.xml',
          destination: '/api/tools/youtube-summary/sitemap',
        },
        {
          source: '/api/tools/youtube-summary/sitemap/:index(\\d+).xml',
          destination: '/api/tools/youtube-summary/sitemap/:index',
        },
        {
          source: '/api/tools/youtube-summary/sitemap/:slug(.*).xml',
          destination: '/api/tools/youtube-summary/sitemap/:slug',
        },
        // {
        //   source: '/blog',
        //   destination: 'https://chatvolt-blog.vercel.app/blog',
        // },
        // {
        //   source: '/blog/:path*',
        //   destination: 'https://chatvolt-blog.vercel.app/blog/:path*',
        // },

        {
          source: '/help',
          destination: 'https://docs.chatvolt.ai/',
        },
        {
          source: '/help/:path*',
          destination: 'https://docs.chatvolt.ai/:path*',
        },

        {
          source: '/@:path',
          destination: '/agents/@:path/standalone',
        },
        {
          source: '/.well-known/ai-plugin.json',
          destination: '/api/openai/plugin/ai-plugin-json',
        },
        {
          source: '/.well-known/openapi.yaml',
          destination: '/api/openai/plugin/openapi-yaml',
        },
        // {
        //   source: '/datastores/:id/:path*',
        //   destination: '/api/datastores/:id/:path*',
        // },
        {
          source: '/datastores/:path*',
          destination: '/api/datastores/:path*',
          has: [
            {
              type: 'host',
              value: 'api.chatvolt.ai',
            },
          ],
        },
        {
          source: '/datasources/:path*',
          destination: '/api/datasources/:path*',
          has: [
            {
              type: 'host',
              value: 'api.chatvolt.ai',
            },
          ],
        },
        {
          source: '/agents/query/:id',
          destination: '/api/agents/:id/query',
        },
        {
          source: '/agents/:path*',
          destination: '/api/agents/:path*',
          has: [
            {
              type: 'host',
              value: 'api.chatvolt.ai',
            },
          ],
        },
        {
          source: '/datastores/query/:id',
          destination: '/api/datastores/:id/query',
        },
        {
          source: '/api/datastores/query/:id',
          destination: '/api/datastores/:id/query',
        },
        {
          source: '/datastores/update/:path*',
          destination: '/api/external/datastores/update/:path*',
        },
        {
          source: '/datastores/upsert/:path*',
          destination: '/api/external/datastores/upsert/:path*',
        },
        {
          source: '/datastores/file-upload/:path*',
          destination: '/api/external/datastores/file-upload/:path*',
        },
      ],
    };
  },
  // outputFileTracingIgnores: ['canvas'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      canvas: 'commonjs canvas',
      // Langchain fixes
      'pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js': true,
      '@huggingface/inference': 'commonjs @huggingface/inference',
      replicate: 'commonjs replicate',
      'cohere-ai': 'commonjs cohere-ai',
      typeorm: 'commonjs typeorm',
      'd3-dsv': 'commonjs d3-dsv',
      'srt-parser-2': 'commonjs srt-parser-2',
      puppeteer: 'commonjs puppeteer',
      // 'html-to-text': 'commonjs html-to-text',
      epub2: 'commonjs epub2',

      // TODO: Some dependency from @chatvolt/lib are not found in the Docker image. Find a fix!
      // As a workaround we are adding the following dependencies dashboard's package.json
      // bullmq, playwright, pdfjs-dist
      // playwright and bullmq might be missing because they are marked as exeternal below
      // pdfjs-dist maybe becase it is loaded as a sideEffect in @chatvolt/lib "import 'pdfjs-dist/build/pdf.worker.js';"

      // To mute error: Critical dependency: the request of a dependency is an expression
      playwright: 'commonjs playwright',
      bullmq: 'commonjs bullmq',
    });

    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: '../../packages/ui/src/**/static/**',
            globOptions: {
              ignore: ['**/ui/node_modules'],
            },
            to({ context, absoluteFilename }) {
              // Adds compatibility for windows path
              if (os.platform() === 'win32') {
                const absoluteFilenameWin = absoluteFilename.replaceAll(
                  '\\',
                  '/'
                );
                const contextWin = context.replaceAll('\\', '/');
                const appName = /ui\/src\/static\/(.*)\//.exec(
                  absoluteFilenameWin
                );
                return Promise.resolve(
                  `${contextWin}/public/static/${appName[1]}/[name][ext]`
                );
              }
              const appName = /ui\/src\/static\/(.*)\//.exec(absoluteFilename);

              return Promise.resolve(
                `${context}/public/shared/${appName[1]}/[name][ext]`
              );
            },
          },
          {
            from: '../../packages/integrations/**/static/**',
            globOptions: {
              ignore: ['**/integrations/node_modules'],
            },
            to({ context, absoluteFilename }) {
              // Adds compatibility for windows path
              if (os.platform() === 'win32') {
                const absoluteFilenameWin = absoluteFilename.replaceAll(
                  '\\',
                  '/'
                );
                const contextWin = context.replaceAll('\\', '/');
                const appName = /integrations\/(.*)\/static/.exec(
                  absoluteFilenameWin
                );
                return Promise.resolve(
                  `${contextWin}/public/integrations/${appName[1]}/[name][ext]`
                );
              }
              const appName = /integrations\/(.*)\/static/.exec(
                absoluteFilename
              );

              return Promise.resolve(
                `${context}/public/integrations/${appName[1]}/[name][ext]`
              );
            },
          },
        ],
      })
    );

    if (isServer && config.name === 'server') {
      const oldEntry = config.entry;

      return {
        ...config,
        async entry(...args) {
          const entries = await oldEntry(...args);
          return {
            ...entries,
            'datasource-loader': path.resolve(
              process.cwd(),
              'workers/datasource-loader.ts'
            ),
            'daily-leads': path.resolve(process.cwd(), 'cron/daily-leads.tsx'),
          };
        },
      };
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);

if (process.env.SENTRY_ORGANIZATION) {
  // Injected content via Sentry wizard below

  const { withSentryConfig } = require('@sentry/nextjs');

  module.exports = withSentryConfig(
    module.exports,
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      // Suppresses source map uploading logs during build
      silent: true,

      org: process.env.SENTRY_ORGANIZATION,
      project: 'javascript-nextjs',
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: true,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      tunnelRoute: '/monitoring',

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,
    }
  );
}
