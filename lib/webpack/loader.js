'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _virtualModuleWebpackPlugin = require('virtual-module-webpack-plugin');

var _virtualModuleWebpackPlugin2 = _interopRequireDefault(_virtualModuleWebpackPlugin);

var _plugin = require('../babel/plugin');

var _transform = require('../transform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loader(src, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  if ((0, _plugin.hasStyles)(src)) {
    var target = this.resourcePath + '.css';
    var content = 'module.exports = ' + (0, _plugin.extractStyles)(src);
    var rules = this.exec(content, target);
    var css = (0, _transform.stylesToRule)(rules).toString();

    if (css.length > 0) {
      var fs = this._compilation.compiler.inputFileSystem;

      var stats = _virtualModuleWebpackPlugin2.default.createStats({ contents: css });
      fs._statStorage.data[target] = [null, stats];
      fs._readFileStorage.data[target] = [null, css];

      return this.callback(null, src + '\nrequire(\'' + target + '\')', map);
    }

    return this.callback(null, src, map);
  }

  return this.callback(null, src, map);
} /* eslint-disable no-underscore-dangle */


exports.default = loader;