const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  staticPageGenerationTimeout: 300,
  basePath: '/blog',
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://chatvolt-blog.vercel.app/blog'
      : undefined,
  transpilePackages: ['@chatvolt/lib', '@chatvolt/ui'],
  images: {
    domains: [
      'localhost',
      'www.notion.so',
      'notion.so',
      'images.unsplash.com',
      'chatvolt.ai',
      'www.chatvolt.ai',
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      canvas: 'commonjs canvas',
    });

    return config;
  },
});
