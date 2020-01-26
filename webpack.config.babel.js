import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const isDev = environment === 'development';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.tsx',

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'index.js',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets'),
      classes: path.resolve(__dirname, 'src/classes'),
      config: path.resolve(__dirname, 'config.ts'),
      components: path.resolve(__dirname, 'src/components'),
      plugins: path.resolve(__dirname, 'src/plugins'),
      root: path.resolve(__dirname),
      state: path.resolve(__dirname, 'src/state'),
      styles: path.resolve(__dirname, 'src/styles'),
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat'
    }
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [
          /node_modules/,
          '/src/assets/svg/**/*.*',
          '/src/assets/js/libgif/**/*.*'
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-modules-typescript-loader' },
          {
            loader: 'css-loader',
            options: {
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
              modules: {
                mode: 'local',
                // Provide path and class info in dev
                localIdentName: isDev
                  ? '[path][title]__[local]--[hash:base64:5]'
                  : '[hash:base64]',
                context: path.resolve(__dirname, 'src')
              }
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {}
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },

  node: {
    global: true,
    __filename: false
  },

  devtool: isDev ? 'source-map' : false,

  devServer: {
    port: process.env.PORT || 8080,
    host: 'localhost',
    colors: true,
    publicPath: '/build',
    contentBase: './',
    historyApiFallback: true,
    open: true
  },

  optimization: {
    // Disable minification for dev
    minimize: !isDev
  },

  // Add gzip output
  plugins: [new CompressionPlugin()]
};
