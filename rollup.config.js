// import banner from './src/banner';
import html from 'rollup-plugin-html';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';
import preact from 'rollup-plugin-preact';
import sass from 'rollup-plugin-sass';

export default {
  input: 'src/index.js',
  // external: ['knockout', 'jquery', 'lodash', 'break_infinity.js'],
  output: [
    {
      file: 'dist/index.js',
      format: 'iife',
      // globals: {
      //   knockout: 'ko',
      //   jquery: 'jQuery',
      //   lodash: '_',
      //   'break_infinity.js': 'Decimal'
      // },
      // banner,
      interop: false
    }
  ],
  plugins: [
    html({
      include: [`src/components/**/*.html`]
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        [
          'babel-plugin-transform-react-jsx',
          {
            pragma: 'h',
            pragmaFrag: 'Fragment'
          }
        ]
      ]
    }),
    postcss({
      plugins: [
        postcssModules({
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        })
      ]
    }),
    preact(),
    sass()
  ]
};
