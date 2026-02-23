import imageHostsConfig from './image-hosts.config.js';

const { imageHosts } = imageHostsConfig;
const enableComponentTagger = process.env.ENABLE_COMPONENT_TAGGER === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  distDir: process.env.DIST_DIR || '.next',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: imageHosts,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/homepage',
        permanent: false,
      },
    ];
  },
  webpack(config) {
    // `@dhiwise/component-tagger` currently breaks with newer ESM-only `chalk` versions.
    // Keep it opt-in so normal local/dev/prod builds work.
    if (enableComponentTagger) {
      config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: '@dhiwise/component-tagger/nextLoader',
          },
        ],
      });
    }
    return config;
  },
};

export default nextConfig;
