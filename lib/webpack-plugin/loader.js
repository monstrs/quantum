'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _transform = require('./transform');

var _transform2 = _interopRequireDefault(_transform);

var _classNameFromPath = require('./classNameFromPath');

var _classNameFromPath2 = _interopRequireDefault(_classNameFromPath);

var _cssfs = require('./cssfs');

var _cssfs2 = _interopRequireDefault(_cssfs);

function loader(src, map) {
  if (this && this.cacheable) {
    this.cacheable();
  }

  if (/_createDecoratedClass/.exec(src) && /quantum/.exec(src)) {
    var options = this.options.quantum || {};
    var className = (0, _classNameFromPath2['default'])(this.resourcePath, options);

    var result = (0, _transform2['default'])(src, map, className);

    var code = result.code;

    if (result.css.length > 0) {
      var target = '/cssfs' + this.resourcePath.replace('.js', '.css');

      if (_cssfs2['default'].existsSync(target)) {
        _cssfs2['default'].writeFileSync(target, result.css);
      } else {
        _cssfs2['default'].appendFileSync(target, result.css);
      }

      code += '\nrequire(\'' + target + '\')';
    }

    return this.callback(null, code, result.map);
  }

  this.callback(null, src, map);
}

exports['default'] = loader;
module.exports = exports['default'];