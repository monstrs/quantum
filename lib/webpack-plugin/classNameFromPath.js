var last = require('underscore').last;
var include = require('underscore.string').include;
var capitalize = require('underscore.string').capitalize;
var replaceExt = require('replace-ext');

function getClassName(parts) {
  var className = [];
  var file = last(parts);

  parts.forEach(function(part) {
    if (!include(file.toLowerCase(), part.toLowerCase())) {
      className.push(capitalize(part));
    }
  });

  className.push(file);

  return className.join('');
}

function classNameFromPath(path, options) {
  var className = [];
  var cwd = options.cwd || process.cwd();
  var alias = options.alias;
  var aliasMatch = false;

  if (alias) {
    Object.keys(alias).forEach(function(key) {
      if (path.indexOf(alias[key]) !== -1) {
        className.push(key);
        className.push(getClassName(replaceExt(path, '').replace(alias[key], '').split('/')));
        aliasMatch = true;
      }
    });
  }

  if (!aliasMatch) {
    className.push(getClassName(replaceExt(path, '').replace(cwd, '').split('/')));
  }

  return className.join('');
}

module.exports = classNameFromPath;
