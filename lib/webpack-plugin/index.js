'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _webpackCoreLibConcatSource = require('webpack-core/lib/ConcatSource');

var _webpackCoreLibConcatSource2 = _interopRequireDefault(_webpackCoreLibConcatSource);

function QuantumStylePlugin(target) {
  this.target = target;
}

QuantumStylePlugin.loader = function loader(options) {
  return require.resolve('./loader') + (options ? '?' + options : '');
};

QuantumStylePlugin.prototype.apply = function apply(compiler) {
  var target = this.target;
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('optimize-chunk-assets', function (chunks, callback) {
      compilation.assets[target] = new _webpackCoreLibConcatSource2['default'](require('./collector').source());
      callback();
    });
  });
};

exports['default'] = QuantumStylePlugin;
module.exports = exports['default'];