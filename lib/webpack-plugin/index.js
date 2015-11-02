'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _clearRequire = require('clear-require');

var _clearRequire2 = _interopRequireDefault(_clearRequire);

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
  var options = compiler.options;

  this.resolverPlugin.apply(compiler);

  compiler.plugin('environment', function environment() {
    compiler.inputFileSystem = _cssfs2['default'];
  });

  if (options.quantum && options.quantum.theme) {
    if (_fs2['default'].existsSync(options.quantum.theme)) {
      compiler.plugin('watch-run', function (watcher, callback) {
        _fs2['default'].watch(options.quantum.theme, function () {
          (0, _clearRequire2['default'])(options.quantum.theme);
        });

        callback();
      });
    }
  }
};

exports['default'] = QuantumStylePlugin;
module.exports = exports['default'];