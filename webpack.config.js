/* eslint-disable */
var helpers = require('./webpack.helpers');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  debug: true,
  cache: false,
  devtool: 'source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/js/main.jsx')
  ],
  output: {
    path: path.join(__dirname, 'build/js'),
    filename: 'main.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)?$/,
      loader: 'react-hot',
      exclude: /\/(node_modules|build)\//
    },
    {
      test: /\.js?$/,
      loader: 'babel',
      exclude: /\/(node_modules|build)\//,
      query: {
        babelrc: false,
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime', 'transform-flow-strip-types']
      }
    },
    {
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /\/(node_modules|build)\//,
      query: {
        babelrc: false,
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['transform-runtime', 'flow-react-proptypes', 'transform-flow-strip-types']
      }
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader!"
    },
    {
      test: /\.scss?$/,
      exclude: /\/node_modules\//,
      loader: "style-loader!css-loader!sass-loader!"
    },
    {
      test: /\.(png|jpg)$/,
      loader: "file-loader?name=images/[name].[ext]"
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }]
  },
  resolve: {
    alias: helpers.modules,
    extensions: [ "", ".js", ".jsx" ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
