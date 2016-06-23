import { cloneElement, isValidElement } from 'react'
import { match } from './utils/modifier'
import { getSuperMethod } from './utils/inheritance'
import { stylesToRule } from './transform'
import { getModClassName, getMethodClassName, getMethodGetterName } from './utils/className'

function createClassMap(classMap) {
  return (props, state) => Object.keys(classMap).reduce((classNames, modifier) => {
    if (match(modifier, props, state)) {
      classNames.push(classMap[modifier])
    }

    return classNames
  }, []).join(' ')
}

function create(styles) {
  const styleSheet = stylesToRule(styles, true)
  const rules = styleSheet.rules

  const classMap = Object.keys(styles).reduce((result, modifier) => ({
    ...result,
    [modifier]: rules[modifier].className,
  }), {})

  styleSheet.attach()

  return createClassMap(classMap)
}

function createNamed(className, styles) {
  const { classMap, stylesMap } = Object.keys(styles).reduce((result, modifier) => {
    const modifierClassName = getModClassName(className, modifier)

    return {
      classMap: { ...result.classMap, [modifier]: modifierClassName },
      stylesMap: { ...result.stylesMap, [`.${modifierClassName}`]: styles[modifier] },
    }
  }, { classMap: [], stylesMap: [] })

  stylesToRule(stylesMap).attach()

  return createClassMap(classMap)
}

export default function style(stylesMap) {
  return (target, key, descriptor) => {
    const styles = createNamed(getMethodClassName(target.constructor.name, key), stylesMap)

    const classNameGetter = getMethodGetterName(key)

    Object.defineProperty(target.constructor.prototype, classNameGetter, {
      configurable: true,
      value: function getMethodClassNameHelper() {
        const classNames = []

        const superMethod = getSuperMethod(Object.getPrototypeOf(target.constructor.prototype), classNameGetter, this)

        if (superMethod) {
          classNames.push(superMethod.call(this))
        }

        return classNames.concat([styles(this.props, this.state)]).join(' ')
      },
    })

    return {
      ...descriptor,
      value: function decoratedDescriptor(...args) {
        const result = descriptor.value.apply(this, args)

        if (!isValidElement(result)) {
          return result
        }

        return cloneElement(result, {
          className: this[classNameGetter].call(this),
        })
      },
    }
  }
}

export const StyleSheet = {
  create,
  createNamed,
  createClassMap,
}
