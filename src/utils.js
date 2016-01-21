import {
  is,
  head,
  tail,
  map,
  toUpper,
  pipe,
  converge,
  join,
  pathEq,
  path,
  init,
  last,
  split,
  flatten,
  match,
  replace,
  toLower,
  isEmpty,
  isNil,
} from 'ramda'

export const capitalize = converge((h, t) => h + t, pipe(toUpper, head), tail)
export const transformModifier = pipe(split('='), map(split('.')), flatten, map(capitalize), join(''))

export const getClassName = (className, modifier) => {
  return join('--', [className, transformModifier(modifier)].filter(i => i !== 'Self'))
}

export const modifierToPath = pipe(split('='), map(split('.')), flatten)

export const modifierMatch = (modifier, props = {}, state = {}) => {
  if (modifier === 'self') {
    return true
  }

  const modifierPath = modifierToPath(modifier)

  const linearMatch = (target) => {
    const value = path(modifierPath, target)

    if (is(Boolean, value)) return value
    if (isNil(value)) return false

    return !isEmpty(value)
  }

  const matcher = modifierPath.length > 1 ?
                    pathEq(init(modifierPath), last(modifierPath)) :
                    linearMatch

  return matcher(props) || matcher(state)
}

export const isThemeVariable = value => is(String, value) && !isEmpty(match(/\$/, value))

export const themeVariableToPath = pipe(tail, split('.'))

export const getValueFromTheme = (value, theme) => {
  if (head(value) !== '$') return value
  const result = path(themeVariableToPath(value), theme)
  return result && result.toString ? result.toString() : result
}

export const injectThemeVariables = (value, theme) => {
  return pipe(split(' '), map(item => getValueFromTheme(item, theme)), join(' '))(value)
}

export const modifierToAttribute = pipe(replace(/([A-Z])/g, '-$1'), toLower)
