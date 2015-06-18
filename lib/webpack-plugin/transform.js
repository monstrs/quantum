var contextify = require('contextify');
var recast = require('recast');
var n = recast.types.namedTypes;
var b = recast.types.builders;
var stylesToCSS = require('./stylesToCSS');

function transform(src, prefix) {
  var css = '';
  var tree = recast.parse(src);

  var parsed = recast.visit(tree, {
    visitObjectExpression: function(path) {
      if (this.isElementMethod(path)) {
        var hasDecorator = false;
        path.value.properties.forEach(function (property) {
          if (property.key.name === 'decorators') {
            hasDecorator = true;
          }
        });
        path.value.properties.forEach(function (property) {
          this.injectStyles(property, path);
          if (hasDecorator) {
            this.injectHelpers(property);
          }
        }.bind(this));
      }

      this.traverse(path);
    },

    injectStyles: function(property, path) {
      if (property.key.name === 'decorators') {
        property.value.elements.forEach(function (item, index) {
          if (n.CallExpression.check(item)) {
            if (this.isStyleDeclaration(item)) {
              this.extractStyles(item.arguments[0], this.getClassName(path));
              property.value.elements[index] = this.buildStyleClassDeclaration(item.callee, item.arguments[0], this.getClassName(path));
            }
          }
        }.bind(this));
      }
    },

    injectHelpers: function(property) {
      if (property.key.name === 'value' && n.FunctionExpression.check(property.value)) {
        if (/render/.exec(property.value.id.name)) {
          property.value.body.body.forEach(function(item) {
            if (n.ReturnStatement.check(item)) {
              if (n.CallExpression.check(item.argument) && n.MemberExpression.check(item.argument.callee)) {
                if (item.argument.callee.property.name === 'createElement') {
                  var props = item.argument.arguments[1];
                  if (n.ObjectExpression.check(props)) {
                    item.argument.arguments[1].properties.push(this.createClassNameGetter(property.value.id.name.replace('render', '')));
                  } else if (n.Literal.check(props)) {
                    item.argument.arguments[1] = b.objectExpression([this.createClassNameGetter(property.value.id.name.replace('render', ''))]);
                  } else if (n.CallExpression.check(props) && props.callee.name === '_extends') {
                    item.argument.arguments[1].arguments[2].properties.push(this.createClassNameGetter(property.value.id.name.replace('render', '')));
                  }
                }
              }
            }
          }.bind(this));
        }
      }
    },

    createClassNameGetter: function(method) {
      var member = b.memberExpression(b.thisExpression(), b.identifier('get' + method + 'ClassName'), false);
      return b.property('init', b.identifier('className'), b.callExpression(member, []));
    },

    isStyleDeclaration: function(node) {
      return (
        n.CallExpression.check(node) &&
        /quantum/.exec(node.callee.name)
      ) || (
        n.CallExpression.check(node) &&
        n.MemberExpression.check(node.callee) &&
        n.Identifier.check(node.callee.object) &&
        /quantum/.exec(node.callee.object.name)
      ) || (
        n.SequenceExpression.check(node.callee) &&
        n.MemberExpression.check(node.callee.expressions[1]) &&
        /quantum/.exec(node.callee.expressions[1].object.name) &&
        n.ObjectExpression.check(node.arguments[0])
      );
    },

    isElementMethod: function(path) {
      var isElementMethod = false;
      path.value.properties.forEach(function(property) {
        if (property.key.name === 'key') {
          if (/render/.exec(property.value.value)) {
            isElementMethod = true;
          }
        }
      });
      return isElementMethod;
    },

    getClassName: function(path) {
      var className = prefix;

      path.value.properties.forEach(function(property) {
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

    extractStyles: function(node, className) {
      src = '(function() { return ' + recast.print(node).code + '})();';

      var context = {};
      contextify(context);

      css += stylesToCSS(context.run(src), className);
    },

    buildStyleClassDeclaration: function(callee, style, className) {
      var properties = [];
      style.properties.forEach(function(property) {
        var finalClassName = className;
        if (property.key.name !== 'self') {
          finalClassName += '--' + property.key.name;
        }
        properties.push(b.property('init', b.literal(property.key.name), b.literal(finalClassName)));
      });

      return b.callExpression(callee, [b.objectExpression(properties)]);
    }
  });

  return {
    code: recast.print(parsed).code,
    css: css
  };
}

module.exports = transform;
