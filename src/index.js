import 'babel-core/external-helpers'

const babelHelpers = global.babelHelpers

function style(classMap) {
  return (target, key, descriptor) => {
    const classNameGetter = `get${key.replace('render', '')}ClassName`

    target[classNameGetter] = function getClassName() {
      const superMethod = babelHelpers.get(Object.getPrototypeOf(target.constructor.prototype), classNameGetter, this)
      const classNames = []

      if (superMethod) {
        classNames.push(superMethod.call(this))
      }

      for (const modifier in classMap) {
        if (modifier === 'self') {
          classNames.push(classMap[modifier])
        } else if (modifier.indexOf('_') !== -1 ) {
          const [modifierName, value] = modifier.split('_')

          if (this.state && this.state[modifierName] === value) {
            classNames.push(classMap[modifier])
          } else if (this.props[modifierName] === value) {
            classNames.push(classMap[modifier])
          }
        } else if (this.state && this.state[modifier]) {
          classNames.push(classMap[modifier])
        } else if (this.props[modifier]) {
          classNames.push(classMap[modifier])
        }
      }

      return classNames.join(' ')
    }

    return descriptor
  }
}

export default style
