'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _j2c = require('j2c');

var _j2c2 = _interopRequireDefault(_j2c);

var _utils = require('./../utils');

function hyphenate(styles) {
  if (Array.isArray(styles)) {
    throw new Error('Array styles description not supported');
  }

  var modified = {};
  for (var key in styles) {
    if (typeof styles[key] === 'string' || typeof styles === 'number') {
      modified[key.replace(/([A-Z])/g, '-$1').toLowerCase()] = styles[key];
    } else {
      modified[key.replace(/([A-Z])/g, '-$1').toLowerCase()] = hyphenate(styles[key]);
    }
  }

  return modified;
}

function stylesToCSS(style, className) {
  var result = _Object$keys(style).map(function (modifier) {
    return _j2c2['default'].sheet(_defineProperty({}, '.' + (0, _utils.getClassName)(className, modifier), hyphenate(style[modifier]))).replace(/\n/g, '');
  });

  return result.join('');
}

exports['default'] = stylesToCSS;
module.exports = exports['default'];