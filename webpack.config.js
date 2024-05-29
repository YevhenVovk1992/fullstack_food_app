'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './static/src/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/static/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
