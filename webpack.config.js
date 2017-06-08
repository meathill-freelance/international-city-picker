/**
 * Created by meathill on 2017/6/7.
 */

const path = require('path');

module.exports = {
  entry: {
    'desktop-city-picker': './app/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: /node_modules|dist|docs|styl|css/
  }
};