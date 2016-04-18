/* eslint-disable no-underscore-dangle */
import VirtualModulePlugin from 'virtual-module-webpack-plugin'
import { hasStyles, extractStyles } from '../babel/plugin'
import { stylesToRule } from '../transform'

function loader(src, map) {
  if (this.cacheable) {
    this.cacheable()
  }

  if (hasStyles(src)) {
    const target = `${this.resourcePath}.css`
    const content = `module.exports = ${extractStyles(src)}`
    const rules = this.exec(content, target)
    const css = stylesToRule(rules).toString()

    if (css.length > 0) {
      const fs = this._compilation.compiler.inputFileSystem

      const stats = VirtualModulePlugin.createStats({ contents: css })
      fs._statStorage.data[target] = [null, stats]
      fs._readFileStorage.data[target] = [null, css]

      return this.callback(null, `${src}\nrequire('${target}')`, map)
    }

    return this.callback(null, src, map)
  }

  return this.callback(null, src, map)
}

export default loader
