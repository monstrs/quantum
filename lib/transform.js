'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stylesToRule = stylesToRule;

var _jss = require('jss');

var _jss2 = _interopRequireDefault(_jss);

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

var _jssCamelCase = require('jss-camel-case');

var _jssCamelCase2 = _interopRequireDefault(_jssCamelCase);

var _jssVendorPrefixer = require('jss-vendor-prefixer');

var _jssVendorPrefixer2 = _interopRequireDefault(_jssVendorPrefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jss2.default.use((0, _jssVendorPrefixer2.default)());
_jss2.default.use((0, _jssCamelCase2.default)());
_jss2.default.use((0, _jssNested2.default)());

function stylesToRule(styles) {
  var named = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  return _jss2.default.createStyleSheet(styles, { named: named });
}