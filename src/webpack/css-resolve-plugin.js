/* eslint-disable no-underscore-dangle */
import cssfs from './cssfs'

class CssResolvePlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.resolvers.normal.plugin('resolve', function resolverPlugin(request, callback) {
      if (request.request.indexOf('/cssfs') === 0) {
        const fs = this.fileSystem

        const css = cssfs.readFileSync(request.request)
        const stats = cssfs.statSync(request.request)

        fs._statStorage.data[request.request] = [null, stats]
        fs._readFileStorage.data[request.request] = [null, css]
      }

      if (callback) {
        callback()
      }
    })
  }
}

export default CssResolvePlugin
