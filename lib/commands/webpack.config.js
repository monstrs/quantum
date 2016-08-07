'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugins = exports.module = exports.postcss = exports.output = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _cssResolvePlugin = require('../webpack/css-resolve-plugin');

var _cssResolvePlugin2 = _interopRequireDefault(_cssResolvePlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-extraneous-dependencies */
var output = exports.output = {
  path: '/'
};

var postcss = exports.postcss = [(0, _autoprefixer2.default)({
  browsers: ['>2%', 'last 2 versions']
})];

var _module = {
  loaders: [{
    test: /\.js?$/,
    loader: _path2.default.resolve(__dirname, '../webpack/loader'),
    exclude: /node_modules/
  }, {
    test: /\.js?$/,
    loader: 'babel',
    exclude: /node_modules/,
    query: {
      babelrc: true
    }
  }, {
    test: /\.css$/,
    loaders: _extractTextWebpackPlugin2.default.extract({
      notExtractLoader: 'style-loader',
      loader: 'css-loader!postcss-loader'
    })
  }]
};

exports.module = _module;
var plugins = exports.plugins = [new _cssResolvePlugin2.default(), new _extractTextWebpackPlugin2.default('index.css')];