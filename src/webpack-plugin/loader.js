import transform from './transform'
import classNameFromPath from './classNameFromPath'

function loader(src, map) {
  if (this && this.cacheable) {
    this.cacheable()
  }

  if (/_createDecoratedClass/.exec(src) && /quantum/.exec(src)) {
    const options = this.options.quantum || {}
    const className = classNameFromPath(this.resourcePath, options)

    const result = transform(src, map, className)

    if (result.css.length > 0) {
      require('./collector').add(className, result.css)
    }

    return this.callback(null, result.code, result.map)
  }

  this.callback(null, src, map)
}

export default loader
