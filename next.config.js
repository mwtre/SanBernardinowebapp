/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/SanBernardinowebapp',
  assetPrefix: '/SanBernardinowebapp',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Ignore Node.js modules that are not available in browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      child_process: false,
      crypto: false,
    };

    // Ignore optional React Native dependencies (not needed for web)
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@react-native-async-storage/async-storage': false,
        'pino-pretty': false,
      };
    }

    // Ignore warnings for optional dependencies
    config.ignoreWarnings = [
      { module: /node_modules\/@metamask\/sdk/ },
      { module: /node_modules\/pino/ },
    ];

    return config;
  },
};

module.exports = nextConfig;

