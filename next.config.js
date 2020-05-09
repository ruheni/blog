const optimizedImages = require('next-optimized-images')

module.exports = {
    target: 'serverless',
    webpack: function (config) {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        })
        return config
    },
    optimizedImages,
}
