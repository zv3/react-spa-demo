/* eslint-disable */
var helpers = require('./webpack.helpers');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/js/main'),
  output: {
    path: path.resolve('dist/js'),
    filename: 'main.js',
    libraryTarget: 'amd'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /\/(node_modules|build)\//,
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-runtime', 'transform-flow-strip-types']
        }
      },
    {
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /\/(node_modules|build)\//,
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['transform-runtime', 'transform-flow-strip-types']
      }
    }
    ]
  },
  resolve: {
    alias: helpers.modules,
    extensions: [ "", ".js", ".jsx" ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ]
};
