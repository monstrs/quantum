import j2c from 'j2c'
import { getClassName } from './../utils'

function hyphenate(styles) {
  if (Array.isArray(styles)) {
    throw new Error('Array styles description not supported')
  }

  const modified = {}
  for (const key in styles) {
    if (typeof styles[key] === 'string' || typeof styles === 'number') {
      modified[key.replace(/([A-Z])/g, '-$1').toLowerCase()] = styles[key]
    } else {
      modified[key.replace(/([A-Z])/g, '-$1').toLowerCase()] = hyphenate(styles[key])
    }
  }

  return modified
}

function stylesToCSS(style, className) {
  const result = Object.keys(style).map((modifier) => {
    return j2c.sheet({
      [`.${getClassName(className, modifier)}`]: hyphenate(style[modifier]),
    }).replace(/\n/g, '')
  })

  return result.join('')
}

export default stylesToCSS
