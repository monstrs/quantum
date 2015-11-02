/* eslint-disable guard-for-in */
import jss from 'jss'
import nested from 'jss-nested'
import { getClassName, isThemeVariable, injectThemeVariables, modifierToAttribute } from './../utils'

jss.use(nested)

function hyphenate(styles, theme = {}) {
  if (Array.isArray(styles)) {
    throw new Error('Array styles description not supported')
  }

  const modified = {}
  for (const key in styles) {
    let value = null

    if (isThemeVariable(styles[key])) {
      value = injectThemeVariables(styles[key], theme)
    } else if (typeof styles[key] === 'string' || typeof styles[key] === 'number') {
      value = styles[key]
    } else {
      value = hyphenate(styles[key], theme)
    }

    modified[modifierToAttribute(key)] = value
  }

  return modified
}

function stylesToCSS(style, className, theme) {
  const result = Object.keys(style).map((modifier) => {
    return jss.createStyleSheet({
      [`.${getClassName(className, modifier)}`]: hyphenate(style[modifier], theme),
    }, { named: false }).toString().replace(/\n/g, '')
  })

  return result.join('')
}

export default stylesToCSS
