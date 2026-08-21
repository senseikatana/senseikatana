module.exports = {
  plugins: {
    autoprefixer: {},
    // PurgeCSS configuration (same as Tailwind)
    '@fullhuman/postcss-purgecss': {
      content: [
        './index.html',
        './src/scss/**/*.scss',
        './src/**/*.html',
        './src/**/*.js',
        './src/**/*.jsx',
        './src/**/*.ts',
        './src/**/*.tsx',
        './src/**/*.vue',
        './public/**/*.html'
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        standard: [
          /^sm:/,
          /^md:/,
          /^lg:/,
          /^xl:/,
          /^2xl:/,
          /^3xl:/,
          /^hover:/,
          /^focus:/,
          /^active:/,
          /^disabled:/,
          /^group-hover:/,
          /^peer-checked:/
        ],
        deep: [/^data-/],
        greedy: [/^is-/, /^has-/]
      },
      keyframes: true,
      fontFace: true,
      rejected: false,
      variables: true
    }
  }
};