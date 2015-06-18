var ConcatSource = require('webpack-core/lib/ConcatSource');

function QuantumStylePlugin(target) {
  this.target = target;
}

QuantumStylePlugin.loader = function(options) {
  return require.resolve('./loader') + (options ? '?' + options : '');
};

QuantumStylePlugin.prototype.apply = function(compiler) {
  var target = this.target;
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('optimize-chunk-assets', function(chunks, callback) {
      compilation.assets[target] = new ConcatSource(require('./collector').source());
      callback();
    });
  });
};

module.exports = QuantumStylePlugin;
