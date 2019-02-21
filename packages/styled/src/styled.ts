import { match, extract } from '@elementum/modifiers'
import emotionStyled from '@emotion/styled'
import { CreateStyledProxy } from './types'

const applyModifiers = styles => props =>
  Object.keys(styles).reduce((result, modifier) => {
    if (modifier === 'self') {
      return result
    }

    if (match(modifier, props)) {
      return {
        ...result,
        ...styles[modifier],
      }
    }

    return result
  }, {})

const styled: CreateStyledProxy = tag => styles => {
  const modifiers = extract(styles)

  return emotionStyled(tag, {
    shouldForwardProp: prop => !modifiers.includes(prop),
  })(styles.self, applyModifiers(styles))
}

export default styled
