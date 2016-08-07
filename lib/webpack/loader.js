'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _plugin = require('../babel/plugin');

var _transform = require('../transform');

var _cssfs = require('./cssfs');

var _cssfs2 = _interopRequireDefault(_cssfs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loader(src, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  if ((0, _plugin.hasStyles)(src)) {
    var target = '/cssfs' + this.resourcePath + '.css';
    var content = 'module.exports = ' + (0, _plugin.extractStyles)(src);
    var rules = this.exec(content, target);
    var css = (0, _transform.stylesToRule)(rules).toString();

    if (css.length > 0) {
      _cssfs2.default.appendFileSync(target, css);

      return this.callback(null, src + '\nrequire(\'' + target + '\')', map);
    }

    return this.callback(null, src, map);
  }

  return this.callback(null, src, map);
} /* eslint-disable no-underscore-dangle */
exports.default = loader;