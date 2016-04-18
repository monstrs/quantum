export function getSuperMethod(object = Function.prototype, property, receiver) {
  const desc = Object.getOwnPropertyDescriptor(object, property)

  if (desc === undefined) {
    const parent = Object.getPrototypeOf(object)

    if (parent === null) {
      return undefined
    }

    return getSuperMethod(parent, property, receiver)
  } else if ('value' in desc) {
    return desc.value
  }

  const getter = desc.get

  if (getter === undefined) {
    return undefined
  }

  return getter.call(receiver)
}
