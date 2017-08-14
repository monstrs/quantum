import jss from 'jss'
import { match } from './modifier'
import { getModClassName } from './className'

function createClassMap(classMap) {
  return (props, state) => Object.keys(classMap).reduce((classNames, modifier) => {
    if (match(modifier, props, state)) {
      classNames.push(classMap[modifier])
    }

    return classNames
  }, []).join(' ')
}

function create(styles) {
  const styleSheet = jss.createStyleSheet(styles, { named: true })

  const classMap = Object.keys(styles).reduce((result, modifier) => ({
    ...result,
    [modifier]: styleSheet.classes[modifier],
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

  jss.createStyleSheet(stylesMap, { named: false }).attach()

  return createClassMap(classMap)
}

export const StyleSheet = {
  create,
  createNamed,
  createClassMap,
}
