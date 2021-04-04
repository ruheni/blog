const optimizedImages = require("next-optimized-images");

module.exports = {
  optimizedImages,
  future: {
    webpack5: true,
    strictPostcssConfiguration: true
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/sitemap');
      require('./scripts/rss');
    }

    return config;
  },
};
