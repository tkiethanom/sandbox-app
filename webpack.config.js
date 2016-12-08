'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var IS_DEV = (process.env.NODE_ENV == 'development') ? true : false;

var WebpackNotifierPlugin = require('webpack-notifier');


module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    (IS_DEV) ? new WebpackNotifierPlugin({alwaysNotify: true}) : function(){},
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      loaders: ['babel']
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    },
    {
      test: /\.scss$/,
      loaders: (IS_DEV)
        ? ["style", "css", "resolve-url", "sass?sourceMap"]
        : ["style", "css", "resolve-url", "sass"]
    },
    ]
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      sass: 'app/sass',
      components: 'app/components',
      reducers: 'app/reducers',
      actions: 'app/actions',
      pages: 'app/pages',
      helpers: 'app/helpers'
    }
  },
};
