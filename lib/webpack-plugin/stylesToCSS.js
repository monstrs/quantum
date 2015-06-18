var j2c = require('j2c');

function hyphenate(styles) {
  if(Array.isArray(styles)) {
    throw new Error('Array styles description not supported');
  }

  var modified = {};
  for (var key in styles) {
    if (typeof styles[key] === 'string' || typeof styles === 'number') {
      modified[key.replace(/([A-Z])/g, '-$1').toLowerCase()] = styles[key];
    } else {
      modified[key.replace(/([A-Z])/g, '-$1').toLowerCase()] = hyphenate(styles[key]);
    }
  }

  return modified;
}

function stylesToCSS(style, className) {
  var result = [];

  for(var modifier in style) {
    var finalClassName = '.';
    if (modifier === 'self') {
      finalClassName += className;
    } else {
      finalClassName += className + '--' + modifier;
    }

    var sheet = {};
    sheet[finalClassName] = hyphenate(style[modifier]);

    result.push(j2c.sheet(sheet).replace(/\n/g, ''));
  }

  return result.join('');
}

module.exports = stylesToCSS;
