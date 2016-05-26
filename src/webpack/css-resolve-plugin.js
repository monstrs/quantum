/* eslint-disable no-underscore-dangle */
import VirtualModulePlugin from 'virtual-module-webpack-plugin'
import cssfs from './cssfs'

class CssResolvePlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.resolvers.normal.plugin('resolve', function resolverPlugin(request, callback) {
      if (request.request.indexOf('/cssfs') == 0) {
        const fs = this.fileSystem
        const css = cssfs.readFileSync(request.request)

        const stats = VirtualModulePlugin.createStats({ contents: css })

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
