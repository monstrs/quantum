'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.match = undefined;

var _ramda = require('ramda');

var toPath = (0, _ramda.pipe)((0, _ramda.split)('='), (0, _ramda.map)((0, _ramda.split)('.')), _ramda.flatten);

var match = exports.match = function match(modifier) {
  var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var state = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  if (modifier === 'self') {
    return true;
  }

  var modifierPath = toPath(modifier);

  var linearMatch = function linearMatch(target) {
    var value = (0, _ramda.path)(modifierPath, target);

    if ((0, _ramda.is)(Boolean, value)) return value;
    if ((0, _ramda.isNil)(value)) return false;

    return !(0, _ramda.isEmpty)(value);
  };

  var matcher = modifierPath.length > 1 ? (0, _ramda.pathEq)((0, _ramda.init)(modifierPath), (0, _ramda.last)(modifierPath)) : linearMatch;

  return matcher(props) || matcher(state);
};