const purgecss = require('@fullhuman/postcss-purgecss')({
    // paths to all templates in project
    content: [
        './pages/**/*.tsx',
        './components/**/*tsx'
    ],
    // any special characters
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

module.exports = {
    plugins: [
        "postcss-import",
        "autoprefixer",
        ...(process.env.NODE_ENV === 'production' ? [purgecss] : []
        )]
}
