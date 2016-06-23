'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModClassName = getModClassName;
exports.getMethodClassName = getMethodClassName;
exports.getMethodGetterName = getMethodGetterName;
exports.getClassNameFromPath = getClassNameFromPath;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function capitalize(value) {
  return value.substr(0, 1).toUpperCase() + value.substr(1);
}

function transformModifier(mod) {
  return mod.split('=').map(function (value) {
    return value.split('.').map(capitalize).join('');
  }).join('');
}

function getModClassName(className, mod) {
  return [className, transformModifier(mod)].filter(function (i) {
    return i !== 'Self';
  }).join('--');
}

function getMethodClassName(className, method) {
  return [className, method.replace('render', '')].join('');
}

function getMethodGetterName(method) {
  return ['get', method.replace('render', ''), 'ClassName'].join('');
}

function getClassNameFromPath(file, root) {
  var parts = file.replace(_path2.default.extname(file), '').replace(root, '').split('/');

  return parts.map(capitalize).join('');
}