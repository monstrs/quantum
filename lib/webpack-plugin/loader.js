var transform = require('./transform');
var classNameFromPath = require('./classNameFromPath');

module.exports = function(src, map) {
  if (this && this.cacheable) {
    this.cacheable();
  }

  if (/_createDecoratedClass/.exec(src) && /quantum/.exec(src)) {
    var options = this.options.quantum || {};

    var className = classNameFromPath(this.resourcePath, options);

    var result = transform(src, className);

    if (result.css.length > 0) {
      require('./collector').add(className, result.css);
    }

    src = result.code;
  }

  this.callback(null, src, map);
};
