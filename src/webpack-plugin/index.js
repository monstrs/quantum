import ConcatSource from 'webpack-core/lib/ConcatSource'

function QuantumStylePlugin(target) {
  this.target = target
}

QuantumStylePlugin.loader = function loader(options) {
  return require.resolve('./loader') + (options ? '?' + options : '')
}

QuantumStylePlugin.prototype.apply = function apply(compiler) {
  const target = this.target
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
      compilation.assets[target] = new ConcatSource(require('./collector').source())
      callback()
    })
  })
}

export default QuantumStylePlugin
