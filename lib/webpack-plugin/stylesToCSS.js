/* eslint-disable guard-for-in */
'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jss = require('jss');

var _jss2 = _interopRequireDefault(_jss);

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

var _utils = require('./../utils');

_jss2['default'].use(_jssNested2['default']);

function hyphenate(styles) {
  var theme = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (Array.isArray(styles)) {
    throw new Error('Array styles description not supported');
  }

  var modified = {};
  for (var key in styles) {
    var value = null;

    if ((0, _utils.isThemeVariable)(styles[key])) {
      value = (0, _utils.injectThemeVariables)(styles[key], theme);
    } else if (typeof styles[key] === 'string' || typeof styles[key] === 'number') {
      value = styles[key];
    } else {
      value = hyphenate(styles[key], theme);
    }

    modified[(0, _utils.modifierToAttribute)(key)] = value;
  }

  return modified;
}

function stylesToCSS(style, className, theme) {
  var result = _Object$keys(style).map(function (modifier) {
    return _jss2['default'].createStyleSheet(_defineProperty({}, '.' + (0, _utils.getClassName)(className, modifier), hyphenate(style[modifier], theme)), { named: false }).toString().replace(/\n/g, '');
  });

  return result.join('');
}

exports['default'] = stylesToCSS;
module.exports = exports['default'];