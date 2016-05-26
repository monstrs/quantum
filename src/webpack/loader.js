/* eslint-disable no-underscore-dangle */
import { hasStyles, extractStyles } from '../babel/plugin'
import { stylesToRule } from '../transform'
import cssfs from './cssfs'

function loader(src, map) {
  if (this.cacheable) {
    this.cacheable()
  }

  if (hasStyles(src)) {
    const target = `/cssfs${this.resourcePath}.css`
    const content = `module.exports = ${extractStyles(src)}`
    const rules = this.exec(content, target)
    const css = stylesToRule(rules).toString()

    if (css.length > 0) {
      cssfs.appendFileSync(target, css)

      return this.callback(null, `${src}\nrequire('${target}')`, map)
    }

    return this.callback(null, src, map)
  }

  return this.callback(null, src, map)
}

export default loader
