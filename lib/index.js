'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyleSheet = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = style;

var _react = require('react');

var _modifier = require('./utils/modifier');

var _inheritance = require('./utils/inheritance');

var _transform = require('./transform');

var _className = require('./utils/className');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createClassMap(classMap) {
  return function (props, state) {
    return Object.keys(classMap).reduce(function (classNames, modifier) {
      if ((0, _modifier.match)(modifier, props, state)) {
        classNames.push(classMap[modifier]);
      }

      return classNames;
    }, []).join(' ');
  };
}

function create(styles) {
  var styleSheet = (0, _transform.stylesToRule)(styles, true);
  var rules = styleSheet.rules;

  var classMap = Object.keys(styles).reduce(function (result, modifier) {
    return _extends({}, result, _defineProperty({}, modifier, rules[modifier].className));
  }, {});

  styleSheet.attach();

  return createClassMap(classMap);
}

function createNamed(className, styles) {
  var _Object$keys$reduce = Object.keys(styles).reduce(function (result, modifier) {
    var modifierClassName = (0, _className.getModClassName)(className, modifier);

    return {
      classMap: _extends({}, result.classMap, _defineProperty({}, modifier, modifierClassName)),
      stylesMap: _extends({}, result.stylesMap, _defineProperty({}, '.' + modifierClassName, styles[modifier]))
    };
  }, { classMap: [], stylesMap: [] });

  var classMap = _Object$keys$reduce.classMap;
  var stylesMap = _Object$keys$reduce.stylesMap;


  (0, _transform.stylesToRule)(stylesMap).attach();

  return createClassMap(classMap);
}

function style(stylesMap) {
  return function (target, key, descriptor) {
    var styles = createNamed((0, _className.getMethodClassName)(target.constructor.name, key), stylesMap);

    var classNameGetter = (0, _className.getMethodGetterName)(key);

    Object.defineProperty(target.constructor.prototype, classNameGetter, {
      configurable: true,
      value: function getMethodClassNameHelper() {
        var classNames = [];

        var superMethod = (0, _inheritance.getSuperMethod)(Object.getPrototypeOf(target.constructor.prototype), classNameGetter, this);

        if (superMethod) {
          classNames.push(superMethod.call(this));
        }

        return classNames.concat([styles(this.props, this.state)]).join(' ');
      }
    });

    return _extends({}, descriptor, {
      value: function decoratedDescriptor() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var result = descriptor.value.apply(this, args);

        if (!(0, _react.isValidElement)(result)) {
          return result;
        }

        return (0, _react.cloneElement)(result, {
          className: this[classNameGetter].call(this)
        });
      }
    });
  };
}

var StyleSheet = exports.StyleSheet = {
  create: create,
  createNamed: createNamed,
  createClassMap: createClassMap
};