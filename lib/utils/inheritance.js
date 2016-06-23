'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuperMethod = getSuperMethod;
function getSuperMethod() {
  var object = arguments.length <= 0 || arguments[0] === undefined ? Function.prototype : arguments[0];
  var property = arguments[1];
  var receiver = arguments[2];

  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    }

    return getSuperMethod(parent, property, receiver);
  } else if ('value' in desc) {
    return desc.value;
  }

  var getter = desc.get;

  if (getter === undefined) {
    return undefined;
  }

  return getter.call(receiver);
}