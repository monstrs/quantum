import fs from 'fs'
import webpack from 'webpack'
import clearRequire from 'clear-require'
import CSSResolver from './css-resolver'
import cssfs from './cssfs'

function QuantumStylePlugin() {
  this.resolverPlugin = new webpack.ResolverPlugin([CSSResolver])
}

QuantumStylePlugin.loader = function loader(options) {
  return require.resolve('./loader') + (options ? '?' + options : '')
}

QuantumStylePlugin.prototype.apply = function apply(compiler) {
  const { options } = compiler

  this.resolverPlugin.apply(compiler)

  compiler.plugin('environment', function environment() {
    compiler.inputFileSystem = cssfs
  })

  if (options.quantum && options.quantum.theme) {
    if (fs.existsSync(options.quantum.theme)) {
      compiler.plugin('watch-run', (watcher, callback) => {
        fs.watch(options.quantum.theme, () => {
          clearRequire(options.quantum.theme)
        })

        callback()
      })
    }
  }
}

export default QuantumStylePlugin
