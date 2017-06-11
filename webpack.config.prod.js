/**
 * Created by meathill on 2017/6/7.
 */

const path = require('path');
const config = require('./webpack.config');

config.devtool = false;
config.watch = false;

module.exports = config;