module.exports = {
  experimental: {
    // @see https://github.com/vercel/next.js/issues/30330#issuecomment-952172377
    esmExternals: false,
  },
  webpack(config, { nextRuntime }) {
    if (nextRuntime === 'nodejs') {
      config.resolve.alias.canvas = false;
    }
    return config;
  },
};
