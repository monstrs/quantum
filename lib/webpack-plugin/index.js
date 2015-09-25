'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _cssResolver = require('./css-resolver');

var _cssResolver2 = _interopRequireDefault(_cssResolver);

var _cssfs = require('./cssfs');

var _cssfs2 = _interopRequireDefault(_cssfs);

function QuantumStylePlugin() {
  this.resolverPlugin = new _webpack2['default'].ResolverPlugin([_cssResolver2['default']]);
}

QuantumStylePlugin.loader = function loader(options) {
  return require.resolve('./loader') + (options ? '?' + options : '');
};

QuantumStylePlugin.prototype.apply = function apply(compiler) {
  this.resolverPlugin.apply(compiler);

  compiler.plugin('environment', function environment() {
    compiler.inputFileSystem = _cssfs2['default'];
  });
};

exports['default'] = QuantumStylePlugin;
module.exports = exports['default'];