'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasStyles = hasStyles;
exports.extractStyles = extractStyles;

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      Program: {
        enter: function enter() {
          this.extractedStyles = [];
        },
        exit: function exit(path) {
          if (this.extractedStyles.length === 0) {
            return;
          }

          var styles = t.variableDeclaration('var', [t.variableDeclarator(t.identifier(EXTRACTED_STYLES_VAR), t.objectExpression(this.extractedStyles))]);

          styles.leadingComments = [{
            type: 'CommentLine',
            value: STYLES_COMMENT_ID
          }];

          styles.trailingComments = [{
            type: 'CommentLine',
            value: STYLES_COMMENT_ID
          }];

          path.node.body.push(styles);
        }
      },
      ModuleDeclaration: function ModuleDeclaration(_ref2) {
        var node = _ref2.node;

        if (!(node.source && node.source.value === 'quantum')) return;

        var specifiers = node.specifiers.filter(function (item) {
          return item.imported.name === 'StyleSheet';
        });

        if (specifiers.length === 0) return;

        this.localImportName = specifiers[0].local.name;
      },
      CallExpression: function CallExpression(path) {
        var _this = this;

        var node = path.node;
        var hub = path.hub;


        if (!this.localImportName) return;
        if (!t.isMemberExpression(node.callee)) return;
        if (this.localImportName !== node.callee.object.name) return;

        if (node.callee.property.name === 'create') {
          (function () {
            var _hub$file$opts = hub.file.opts;
            var filename = _hub$file$opts.filename;
            var moduleRoot = _hub$file$opts.moduleRoot;
            var _hub$file$opts$quantu = _hub$file$opts.quantum;
            var quantum = _hub$file$opts$quantu === undefined ? {} : _hub$file$opts$quantu;

            var className = (0, _className.getClassNameFromPath)(filename, quantum.root || moduleRoot);
            var properties = node.arguments[0].properties;

            var _properties$reduce = properties.reduce(function (result, _ref3) {
              var key = _ref3.key;
              var value = _ref3.value;

              result.classMap.push(t.objectProperty(t.stringLiteral(key.name || key.value), t.stringLiteral((0, _className.getModClassName)(className, key.name || key.value))));

              result.styles.push(t.objectProperty(t.stringLiteral('.' + (0, _className.getModClassName)(className, key.name || key.value)), value));

              return result;
            }, { classMap: [], styles: [] });

            var classMap = _properties$reduce.classMap;
            var styles = _properties$reduce.styles;


            _this.extractedStyles = _this.extractedStyles.concat(styles);

            path.replaceWith(t.callExpression(t.memberExpression(t.identifier('StyleSheet'), t.identifier('createClassMap')), [t.objectExpression(classMap)]));
          })();
        }
      }
    }
  };
};

var _className = require('../utils/className');

var STYLES_COMMENT_ID = 'QUANTUM_STYLES_COMMENT';
var EXTRACTED_STYLES_VAR = 'QUANTUM_EXTRACTED_STYLES';

function hasStyles(code) {
  return code.indexOf(STYLES_COMMENT_ID) !== -1;
}

function extractStyles(code) {
  var parts = code.split('//' + STYLES_COMMENT_ID);

  return (parts[1] || '').substr(1).replace('var ' + EXTRACTED_STYLES_VAR + ' = ', '');
}