module.exports = {
  // parser: 'sugarss',
  plugins: [
    // 'postcss-import': {},
    // 'postcss-preset-env': {},
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default'
    })
  ]
};
