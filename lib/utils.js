'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ramda = require('ramda');

var capitalize = (0, _ramda.converge)(function (h, t) {
  return h + t;
}, (0, _ramda.pipe)(_ramda.toUpper, _ramda.head), _ramda.tail);
exports.capitalize = capitalize;
var transformModifier = (0, _ramda.pipe)((0, _ramda.split)('='), (0, _ramda.map)((0, _ramda.split)('.')), _ramda.flatten, (0, _ramda.map)(capitalize), (0, _ramda.join)(''));

exports.transformModifier = transformModifier;
var getClassName = function getClassName(className, modifier) {
  return (0, _ramda.join)('--', [className, transformModifier(modifier)].filter(function (i) {
    return i !== 'Self';
  }));
};

exports.getClassName = getClassName;
var modifierToPath = (0, _ramda.pipe)((0, _ramda.split)('='), (0, _ramda.map)((0, _ramda.split)('.')), _ramda.flatten);

exports.modifierToPath = modifierToPath;
var modifierMatch = function modifierMatch(modifier) {
  var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var state = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  if (modifier === 'self') {
    return true;
  }

  var modifierPath = modifierToPath(modifier);

  var matcher = modifierPath.length > 1 ? (0, _ramda.pathEq)((0, _ramda.init)(modifierPath), (0, _ramda.last)(modifierPath)) : (0, _ramda.pathEq)(modifierPath, true);

  return matcher(props) || matcher(state);
};
exports.modifierMatch = modifierMatch;