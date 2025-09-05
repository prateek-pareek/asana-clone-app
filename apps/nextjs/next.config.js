module.exports = {
  experimental: {
    // @see https://github.com/vercel/next.js/issues/30330#issuecomment-952172377
    esmExternals: false,
  },
  webpack(config, { nextRuntime }) {
    if (nextRuntime === 'nodejs') {
      config.resolve.alias.canvas = false;
    }
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    });
    return config;
  },
};
