import vm from 'vm'
import recast from 'recast'
import stylesToCSS from './stylesToCSS'
import { getClassName as getFinalClassName } from './../utils'

const n = recast.types.namedTypes
const b = recast.types.builders

function transform(src, map, prefix, theme) {
  let css = ''
  const tree = recast.parse(src)

  const parsed = recast.visit(tree, {
    visitObjectExpression: function visitObjectExpression(path) {
      if (this.isElementMethod(path)) {
        let hasDecorator = false
        path.value.properties.forEach((property) => {
          if (property.key.name === 'decorators') {
            hasDecorator = true
          }
        })
        path.value.properties.forEach((property) => {
          this.injectStyles(property, path)
          if (hasDecorator) {
            this.injectHelpers(property)
          }
        })
      }

      this.traverse(path)
    },

    injectStyles: function injectStyles(property, path) {
      if (property.key.name === 'decorators') {
        property.value.elements.forEach((item, index) => {
          if (n.CallExpression.check(item)) {
            if (this.isStyleDeclaration(item)) {
              this.extractStyles(item.arguments[0], this.getClassName(path))
              property.value.elements[index] = this.buildStyleClassDeclaration(item.callee, item.arguments[0], this.getClassName(path))
            }
          }
        })
      }
    },

    injectHelpers: function injectHelpers(property) {
      if (property.key.name === 'value' && n.FunctionExpression.check(property.value)) {
        if (/render/.exec(property.value.id.name)) {
          property.value.body.body.forEach((item) => {
            if (n.ReturnStatement.check(item)) {
              if (n.CallExpression.check(item.argument) && n.MemberExpression.check(item.argument.callee)) {
                if (item.argument.callee.property.name === 'createElement') {
                  const props = item.argument.arguments[1]
                  if (n.ObjectExpression.check(props)) {
                    item.argument.arguments[1].properties.push(this.createClassNameGetter(property.value.id.name.replace('render', '')))
                  } else if (n.Literal.check(props)) {
                    item.argument.arguments[1] = b.objectExpression([this.createClassNameGetter(property.value.id.name.replace('render', ''))])
                  } else if (n.CallExpression.check(props) && props.callee.name === '_extends') {
                    item.argument.arguments[1].arguments[2].properties.push(this.createClassNameGetter(property.value.id.name.replace('render', '')))
                  } else if (n.MemberExpression.check(props)) {
                    const extendsDeclaration = b.memberExpression(b.callExpression(b.identifier('require'), [b.literal('babel-runtime/helpers/extends')]), b.identifier('default'), false)
                    const classNameDeclaration = b.objectExpression([this.createClassNameGetter(property.value.id.name.replace('render', ''))])
                    item.argument.arguments[1] = b.callExpression(extendsDeclaration, [b.objectExpression([]), props, classNameDeclaration])
                  }
                }
              }
            }
          })
        }
      }
    },

    createClassNameGetter: function createClassNameGetter(method) {
      const member = b.memberExpression(b.thisExpression(), b.identifier('get' + method + 'ClassName'), false)
      return b.property('init', b.identifier('className'), b.callExpression(member, []))
    },

    isStyleDeclaration: function isStyleDeclaration(node) {
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
      )
    },

    isElementMethod: function isElementMethod(path) {
      let elementMethod = false
      path.value.properties.forEach((property) => {
        if (property.key.name === 'key') {
          if (/render/.exec(property.value.value)) {
            elementMethod = true
          }
        }
      })

      return elementMethod
    },

    getClassName: function getClassName(path) {
      let className = prefix

      path.value.properties.forEach((property) => {
        if (property.key.name === 'key') {
          if (/render/.exec(property.value.value)) {
            const elementName = property.value.value.replace('render', '')
            if (elementName.length > 0) {
              className += '-'
              className += elementName
            }
          }
        }
      })

      return className
    },

    extractStyles: function extractStyles(node, className) {
      const source = '(function() { return ' + recast.print(node).code + '})();'

      css += stylesToCSS(vm.runInNewContext(source, {}), className, theme)
    },

    buildStyleClassDeclaration: function buildStyleClassDeclaration(callee, style, className) {
      const properties = []
      style.properties.forEach((property) => {
        const target = property.key.name || property.key.value
        const finalClassName = getFinalClassName(className, target)
        properties.push(b.property('init', b.literal(target), b.literal(finalClassName)))
      })

      return b.callExpression(callee, [b.objectExpression(properties)])
    },
  })

  return { ...recast.print(parsed, { inputSourceMap: map }), css }
}

export default transform
