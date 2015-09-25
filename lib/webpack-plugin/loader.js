'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _transform = require('./transform');

var _transform2 = _interopRequireDefault(_transform);

var _classNameFromPath = require('./classNameFromPath');

var _classNameFromPath2 = _interopRequireDefault(_classNameFromPath);

function loader(src, map) {
  if (this && this.cacheable) {
    this.cacheable();
  }

  if (/_createDecoratedClass/.exec(src) && /quantum/.exec(src)) {
    var options = this.options.quantum || {};
    var className = (0, _classNameFromPath2['default'])(this.resourcePath, options);

    var result = (0, _transform2['default'])(src, map, className);

    if (result.css.length > 0) {
      require('./collector').add(className, result.css);
    }

    return this.callback(null, result.code, result.map);
  }

  this.callback(null, src, map);
}

exports['default'] = loader;
module.exports = exports['default'];