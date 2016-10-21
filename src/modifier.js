import {
  flatten, init, is, isEmpty, isNil, last,
  map, path, pathEq, pipe, split,
} from 'ramda'

const toPath = pipe(split('='), map(split('.')), flatten)

export const match = (modifier, props = {}, state = {}) => {
  if (modifier === 'self') {
    return true
  }

  const modifierPath = toPath(modifier)

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
