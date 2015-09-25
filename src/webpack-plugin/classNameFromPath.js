import { last } from 'underscore'
import { include } from 'underscore.string'
import { capitalize } from 'underscore.string'
import replaceExt from 'replace-ext'

function getClassName(parts) {
  const className = []
  const file = last(parts)

  parts.forEach((part) => {
    if (!include(file.toLowerCase(), part.toLowerCase())) {
      className.push(capitalize(part))
    }
  })

  className.push(file)

  return className.join('')
}

function classNameFromPath(path, options) {
  const className = []
  const cwd = options.cwd || process.cwd()
  const alias = options.alias
  let aliasMatch = false

  if (alias) {
    Object.keys(alias).forEach((key) => {
      if (path.indexOf(alias[key]) !== -1) {
        className.push(key)
        className.push(getClassName(replaceExt(path, '').replace(alias[key], '').split('/')))
        aliasMatch = true
      }
    })
  }

  if (!aliasMatch) {
    className.push(getClassName(replaceExt(path, '').replace(cwd, '').split('/')))
  }

  return className.join('')
}

export default classNameFromPath
