'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('babel-core/external-helpers');

var babelHelpers = global.babelHelpers;

function style(classMap) {
  return function (target, key, descriptor) {
    var classNameGetter = 'get' + key.replace('render', '') + 'ClassName';

    target[classNameGetter] = function getClassName() {
      var superMethod = babelHelpers.get(Object.getPrototypeOf(target.constructor.prototype), classNameGetter, this);
      var classNames = [];

      if (superMethod) {
        classNames.push(superMethod.call(this));
      }

      for (var modifier in classMap) {
        if (modifier === 'self') {
          classNames.push(classMap[modifier]);
        } else if (modifier.indexOf('_') !== -1) {
          var _modifier$split = modifier.split('_');

          var _modifier$split2 = _slicedToArray(_modifier$split, 2);

          var modifierName = _modifier$split2[0];
          var value = _modifier$split2[1];

          if (this.state && this.state[modifierName] === value) {
            classNames.push(classMap[modifier]);
          } else if (this.props[modifierName] === value) {
            classNames.push(classMap[modifier]);
          }
        } else if (this.state && this.state[modifier]) {
          classNames.push(classMap[modifier]);
        } else if (this.props[modifier]) {
          classNames.push(classMap[modifier]);
        }
      }

      return classNames.join(' ');
    };

    return descriptor;
  };
}

exports['default'] = style;
module.exports = exports['default'];