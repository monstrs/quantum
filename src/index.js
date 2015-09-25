import 'babel-core/external-helpers'
import { modifierMatch } from './utils'

const babelHelpers = global.babelHelpers

export default function style(classMap) {
  return (target, key, descriptor) => {
    const classNameGetter = `get${key.replace('render', '')}ClassName`

    target[classNameGetter] = function getClassName() {
      const superMethod = babelHelpers.get(Object.getPrototypeOf(target.constructor.prototype), classNameGetter, this)
      const classNames = []

      if (superMethod) {
        classNames.push(superMethod.call(this))
      }

      for (const modifier in classMap) {
        if (modifierMatch(modifier, this.props, this.state)) {
          classNames.push(classMap[modifier])
        }
      }

      return classNames.join(' ')
    }

    return descriptor
  }
}
