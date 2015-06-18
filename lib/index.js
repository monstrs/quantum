require('babel-core/external-helpers');

var babelHelpers = global.babelHelpers;

function Style(classMap) {
  return function(target, key, descriptor) {
    var classNameGetter = 'get' + key.replace('render', '') + 'ClassName';

    target[classNameGetter] = function() {
      var superMethod = babelHelpers.get(Object.getPrototypeOf(target.constructor.prototype), classNameGetter, this);
      var classNames = [];

      if (superMethod) {
        classNames.push(superMethod.call(this));
      }

      for (var modifier in classMap) {
        if (modifier === 'self') {
          classNames.push(classMap[modifier]);
        } else if (modifier.indexOf('_') !== -1 ) {
          var modifierName = modifier.split('_').shift();
          var value = modifier.split('_').pop();

          if (this.state && this.state[modifierName] === value) {
            classNames.push(classMap[modifier]);
          } else if (this.props[modifierName] === value) {
            classNames.push(classMap[modifier]);
          }

        } else if (this.state && this.state[modifier]) {
          classNames.push(classMap[modifier]);
        } else if (this.props[modifier]) {
          classNames.push(classMap[modifier]);
        }
      }

      return classNames.join(' ');
    };

    return descriptor;
  };
}

module.exports = Style;
