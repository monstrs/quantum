import transform from './transform'
import classNameFromPath from './classNameFromPath'
import cssfs from './cssfs'

function loader(src, map) {
  if (this && this.cacheable) {
    this.cacheable()
  }

  if (/_createDecoratedClass/.exec(src) && /quantum/.exec(src)) {
    const options = this.options.quantum || {}
    const className = classNameFromPath(this.resourcePath, options)

    const result = transform(src, map, className)

    let code = result.code

    if (result.css.length > 0) {
      const target = `/cssfs${this.resourcePath.replace('.js', '.css')}`

      if (cssfs.existsSync(target)) {
        cssfs.writeFileSync(target, result.css)
      } else {
        cssfs.appendFileSync(target, result.css)
      }

      code += `\nrequire('${target}')`
    }

    return this.callback(null, code, result.map)
  }

  this.callback(null, src, map)
}

export default loader
