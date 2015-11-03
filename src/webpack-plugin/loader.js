import fs from 'fs'
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
    let theme = {}

    if (options.theme && fs.existsSync(options.theme)) {
      theme = require(options.theme)
    }

    const result = transform(src, map, className, theme)

    let code = result.code

    if (result.css.length > 0) {
      const time = (new Date()).valueOf().toString()
      const target = `/cssfs${this.resourcePath.replace('.js', `-${time}.css`)}`
      const targetParts = target.split('/')
      const [filename] = targetParts.pop().split('-')
      const dirname = targetParts.join('/')

      var pattern = new RegExp(`^${filename}-(\\d+)\.css`)

      cssfs.readdirSync(dirname).forEach(file => {
        if (pattern.test(file)) {
          cssfs.unlinkSync(`${dirname}/${file}`)
        }
      })

      cssfs.appendFileSync(target, result.css)

      code += `\nrequire('${target}')`
    }

    return this.callback(null, code, result.map)
  }

  this.callback(null, src, map)
}

export default loader
