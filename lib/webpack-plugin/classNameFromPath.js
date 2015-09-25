'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _underscore = require('underscore');

var _underscoreString = require('underscore.string');

var _replaceExt = require('replace-ext');

var _replaceExt2 = _interopRequireDefault(_replaceExt);

function getClassName(parts) {
  var className = [];
  var file = (0, _underscore.last)(parts);

  parts.forEach(function (part) {
    if (!(0, _underscoreString.include)(file.toLowerCase(), part.toLowerCase())) {
      className.push((0, _underscoreString.capitalize)(part));
    }
  });

  className.push(file);

  return className.join('');
}

function classNameFromPath(path, options) {
  var className = [];
  var cwd = options.cwd || process.cwd();
  var alias = options.alias;
  var aliasMatch = false;

  if (alias) {
    _Object$keys(alias).forEach(function (key) {
      if (path.indexOf(alias[key]) !== -1) {
        className.push(key);
        className.push(getClassName((0, _replaceExt2['default'])(path, '').replace(alias[key], '').split('/')));
        aliasMatch = true;
      }
    });
  }

  if (!aliasMatch) {
    className.push(getClassName((0, _replaceExt2['default'])(path, '').replace(cwd, '').split('/')));
  }

  return className.join('');
}

exports['default'] = classNameFromPath;
module.exports = exports['default'];