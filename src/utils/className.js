import path from 'path'

function capitalize(value) {
  return value.substr(0, 1).toUpperCase() + value.substr(1)
}

function transformModifier(mod) {
  return mod.split('=').map(value => value.split('.').map(capitalize).join('')).join('')
}

export function getModClassName(className, mod) {
  return [className, transformModifier(mod)].filter(i => i !== 'Self').join('--')
}

export function getMethodClassName(className, method) {
  return [className, method.replace('render', '')].join('')
}

export function getMethodGetterName(method) {
  return ['get', method.replace('render', ''), 'ClassName'].join('')
}

export function getClassNameFromPath(file, root) {
  const parts = file.replace(path.extname(file), '')
                    .replace(root, '')
                    .split('/')

  return parts.map(capitalize).join('')
}
