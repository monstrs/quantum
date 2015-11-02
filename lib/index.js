'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = style;

require('babel-core/external-helpers');

var _utils = require('./utils');

var babelHelpers = global.babelHelpers;

function style(classMap) {
  return function (target, key, descriptor) {
    var classNameGetter = 'get' + key.replace('render', '') + 'ClassName';

    _Object$defineProperty(target.constructor.prototype, classNameGetter, {
      configurable: true,
      value: function getClassName() {
        var superMethod = babelHelpers.get(Object.getPrototypeOf(target.constructor.prototype), classNameGetter, this);
        var classNames = [];

        if (superMethod) {
          classNames.push(superMethod.call(this));
        }

        for (var modifier in classMap) {
          if ((0, _utils.modifierMatch)(modifier, this.props, this.state)) {
            classNames.push(classMap[modifier]);
          }
        }

        return classNames.join(' ');
      }
    });

    return descriptor;
  };
}

module.exports = exports['default'];