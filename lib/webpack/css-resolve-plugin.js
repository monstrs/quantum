'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-underscore-dangle */


var _virtualModuleWebpackPlugin = require('virtual-module-webpack-plugin');

var _virtualModuleWebpackPlugin2 = _interopRequireDefault(_virtualModuleWebpackPlugin);

var _cssfs = require('./cssfs');

var _cssfs2 = _interopRequireDefault(_cssfs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CssResolvePlugin = function () {
  function CssResolvePlugin(options) {
    _classCallCheck(this, CssResolvePlugin);

    this.options = options;
  }

  _createClass(CssResolvePlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      compiler.resolvers.normal.plugin('resolve', function resolverPlugin(request, callback) {
        if (request.request.indexOf('/cssfs') == 0) {
          var fs = this.fileSystem;
          var css = _cssfs2.default.readFileSync(request.request);

          var stats = _virtualModuleWebpackPlugin2.default.createStats({ contents: css });

          fs._statStorage.data[request.request] = [null, stats];
          fs._readFileStorage.data[request.request] = [null, css];
        }

        if (callback) {
          callback();
        }
      });
    }
  }]);

  return CssResolvePlugin;
}();

exports.default = CssResolvePlugin;