'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _j2c = require('j2c');

var _j2c2 = _interopRequireDefault(_j2c);

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
    var finalClassName = '.';
    var sheet = {};

    if (modifier === 'self') {
      finalClassName += className;
    } else {
      finalClassName += className + '--' + modifier;
    }

    sheet[finalClassName] = hyphenate(style[modifier]);

    return _j2c2['default'].sheet(sheet).replace(/\n/g, '');
  });

  return result.join('');
}

exports['default'] = stylesToCSS;
module.exports = exports['default'];