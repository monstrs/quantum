function capitalize(value) {
  return value.substr(0, 1).toUpperCase() + value.substr(1)
}

function transformModifier(mod) {
  return mod.split('=').map(value => value.split('.').map(capitalize).join('')).join('')
}

export function getModClassName(className, mod) {
  return [className, transformModifier(mod)].filter(i => i !== 'Self').join('--')
}
