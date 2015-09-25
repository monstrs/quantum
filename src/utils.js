import {
  head,
  tail,
  map,
  toUpper,
  pipe,
  converge,
  join,
  pathEq,
  init,
  last,
  split,
  flatten,
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

  const matcher = modifierPath.length > 1 ?
                    pathEq(init(modifierPath), last(modifierPath)) :
                    pathEq(modifierPath, true)

  return matcher(props) || matcher(state)
}
