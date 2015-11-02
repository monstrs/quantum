'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _vm = require('vm');

var _vm2 = _interopRequireDefault(_vm);

var _recast = require('recast');

var _recast2 = _interopRequireDefault(_recast);

var _stylesToCSS = require('./stylesToCSS');

var _stylesToCSS2 = _interopRequireDefault(_stylesToCSS);

var _utils = require('./../utils');

var n = _recast2['default'].types.namedTypes;
var b = _recast2['default'].types.builders;

function transform(src, map, prefix, theme) {
  var css = '';
  var tree = _recast2['default'].parse(src);

  var parsed = _recast2['default'].visit(tree, {
    visitObjectExpression: function visitObjectExpression(path) {
      var _this = this;

      if (this.isElementMethod(path)) {
        (function () {
          var hasDecorator = false;
          path.value.properties.forEach(function (property) {
            if (property.key.name === 'decorators') {
              hasDecorator = true;
            }
          });
          path.value.properties.forEach(function (property) {
            _this.injectStyles(property, path);
            if (hasDecorator) {
              _this.injectHelpers(property);
            }
          });
        })();
      }

      this.traverse(path);
    },

    injectStyles: function injectStyles(property, path) {
      var _this2 = this;

      if (property.key.name === 'decorators') {
        property.value.elements.forEach(function (item, index) {
          if (n.CallExpression.check(item)) {
            if (_this2.isStyleDeclaration(item)) {
              _this2.extractStyles(item.arguments[0], _this2.getClassName(path));
              property.value.elements[index] = _this2.buildStyleClassDeclaration(item.callee, item.arguments[0], _this2.getClassName(path));
            }
          }
        });
      }
    },

    injectHelpers: function injectHelpers(property) {
      var _this3 = this;

      if (property.key.name === 'value' && n.FunctionExpression.check(property.value)) {
        if (/render/.exec(property.value.id.name)) {
          property.value.body.body.forEach(function (item) {
            if (n.ReturnStatement.check(item)) {
              if (n.CallExpression.check(item.argument) && n.MemberExpression.check(item.argument.callee)) {
                if (item.argument.callee.property.name === 'createElement') {
                  var props = item.argument.arguments[1];
                  if (n.ObjectExpression.check(props)) {
                    item.argument.arguments[1].properties.push(_this3.createClassNameGetter(property.value.id.name.replace('render', '')));
                  } else if (n.Literal.check(props)) {
                    item.argument.arguments[1] = b.objectExpression([_this3.createClassNameGetter(property.value.id.name.replace('render', ''))]);
                  } else if (n.CallExpression.check(props) && props.callee.name === '_extends') {
                    item.argument.arguments[1].arguments[2].properties.push(_this3.createClassNameGetter(property.value.id.name.replace('render', '')));
                  } else if (n.MemberExpression.check(props)) {
                    var extendsDeclaration = b.memberExpression(b.callExpression(b.identifier('require'), [b.literal('babel-runtime/helpers/extends')]), b.identifier('default'), false);
                    var classNameDeclaration = b.objectExpression([_this3.createClassNameGetter(property.value.id.name.replace('render', ''))]);
                    item.argument.arguments[1] = b.callExpression(extendsDeclaration, [b.objectExpression([]), props, classNameDeclaration]);
                  }
                }
              }
            }
          });
        }
      }
    },

    createClassNameGetter: function createClassNameGetter(method) {
      var member = b.memberExpression(b.thisExpression(), b.identifier('get' + method + 'ClassName'), false);
      return b.property('init', b.identifier('className'), b.callExpression(member, []));
    },

    isStyleDeclaration: function isStyleDeclaration(node) {
      return n.CallExpression.check(node) && /quantum/.exec(node.callee.name) || n.CallExpression.check(node) && n.MemberExpression.check(node.callee) && n.Identifier.check(node.callee.object) && /quantum/.exec(node.callee.object.name) || n.SequenceExpression.check(node.callee) && n.MemberExpression.check(node.callee.expressions[1]) && /quantum/.exec(node.callee.expressions[1].object.name) && n.ObjectExpression.check(node.arguments[0]);
    },

    isElementMethod: function isElementMethod(path) {
      var elementMethod = false;
      path.value.properties.forEach(function (property) {
        if (property.key.name === 'key') {
          if (/render/.exec(property.value.value)) {
            elementMethod = true;
          }
        }
      });

      return elementMethod;
    },

    getClassName: function getClassName(path) {
      var className = prefix;

      path.value.properties.forEach(function (property) {
        if (property.key.name === 'key') {
          if (/render/.exec(property.value.value)) {
            var elementName = property.value.value.replace('render', '');
            if (elementName.length > 0) {
              className += '-';
              className += elementName;
            }
          }
        }
      });

      return className;
    },

    extractStyles: function extractStyles(node, className) {
      var source = '(function() { return ' + _recast2['default'].print(node).code + '})();';

      css += (0, _stylesToCSS2['default'])(_vm2['default'].runInNewContext(source, {}), className, theme);
    },

    buildStyleClassDeclaration: function buildStyleClassDeclaration(callee, style, className) {
      var properties = [];
      style.properties.forEach(function (property) {
        var target = property.key.name || property.key.value;
        var finalClassName = (0, _utils.getClassName)(className, target);
        properties.push(b.property('init', b.literal(target), b.literal(finalClassName)));
      });

      return b.callExpression(callee, [b.objectExpression(properties)]);
    }
  });

  return _extends({}, _recast2['default'].print(parsed, { inputSourceMap: map }), { css: css });
}

exports['default'] = transform;
module.exports = exports['default'];