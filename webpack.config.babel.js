import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import FileManagerPlugin from 'filemanager-webpack-plugin';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const isDev = environment === 'development';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.tsx',

  output: {
    path: path.resolve(__dirname, 'build/temp'),
    publicPath: '/',
    filename: 'widget.base.js',
    library: 'WCASG',
    libraryTarget: 'umd'
  },

  externals: {
    WcasgAccessibilityStatement: 'WcasgAccessibilityStatement'
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
      services: path.resolve(__dirname, 'src/services'),
      state: path.resolve(__dirname, 'src/state'),
      styles: path.resolve(__dirname, 'src/styles'),
      theme: path.resolve(__dirname, 'src/theme'),
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat'
    }
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
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
      // {
      //   test: /\.svg$/,
      //   use: {
      //     loader: 'svg-url-loader',
      //     options: {}
      //   }
      // },
      {
        test: /\.svg$/,
        // issuer: {
        //   test: /\.tsx?$/
        // },
        use: ['@svgr/webpack', 'svg-url-loader']
      },
      // {
      //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'svg-url-loader'
      // },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     '@svgr/webpack',
      //     {
      //       loader: 'svg-url-loader',
      //       options: {}
      //     }
      //   ]
      // },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     '@svgr/webpack',
      //     {
      //       loader: 'svg-url-loader',
      //       options: {}
      //     }
      //   ]
      // },
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
    publicPath: '/test/test-page/index.html',
    contentBase: './',
    historyApiFallback: true,
    open: true
  },

  optimization: {
    // Disable minification for dev
    minimize: !isDev
  },

  // Add gzip output
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // include specific files based on a RegExp
      include: /src/,
      // add errors to webpack instead of warnings
      failOnError: false,
      // allow import cycles that include an asynchronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd()
    }),
    new CompressionPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'parsed',
      generateStatsFile: false,
      openAnalyzer: false,
      reportFilename: '../../build/bundle-analysis.html'
    }),
    new FileManagerPlugin({
      onEnd: [
        {
          copy: [
            { source: './build/temp/*.*', destination: './build' },
            {
              source: './build/widget.base.js',
              destination: './tests/sites/basic/js/widget.base.js'
            }
          ]
        },
        {
          delete: ['./build/temp']
        }
      ]
    })
  ]
};
