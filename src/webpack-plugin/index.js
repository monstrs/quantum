import webpack from 'webpack'
import CSSResolver from './css-resolver'
import cssfs from './cssfs'

function QuantumStylePlugin() {
  this.resolverPlugin = new webpack.ResolverPlugin([CSSResolver])
}

QuantumStylePlugin.loader = function loader(options) {
  return require.resolve('./loader') + (options ? '?' + options : '')
}

QuantumStylePlugin.prototype.apply = function apply(compiler) {
  this.resolverPlugin.apply(compiler)

  compiler.plugin('environment', function environment() {
    compiler.inputFileSystem = cssfs
  })
}

export default QuantumStylePlugin
