const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withPurgeCss = require('next-purgecss')

module.exports = withPlugins([
    [optimizedImages],
    withPurgeCss({
        purgeCssPaths: [
            'pages/**/*',
            'components/**/*',
        ]

    })
])
