import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const isDev = environment === 'development';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'index.js',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      classes: path.resolve(__dirname, 'src/classes'),
      config: path.resolve(__dirname, 'config.js'),
      components: path.resolve(__dirname, 'src/components'),
      plugins: path.resolve(__dirname, 'src/plugins'),
      styles: path.resolve(__dirname, 'src/styles'),
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat'
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
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
