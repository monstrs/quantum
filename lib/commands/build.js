'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-console */


var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _memoryFs = require('memory-fs');

var _memoryFs2 = _interopRequireDefault(_memoryFs);

var _webpack3 = require('./webpack.config');

var config = _interopRequireWildcard(_webpack3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.option('-o, --out-file <path>', 'Destination file path').parse(process.argv);

var cwd = process.cwd();
var memfs = new _memoryFs2.default();

var entries = _commander2.default.args.map(function (entry) {
  if (_path2.default.isAbsolute(entry)) {
    return entry;
  }

  return _path2.default.join(cwd, entry);
});

var compiler = (0, _webpack2.default)(_extends({}, config, {
  entry: entries,
  context: cwd
}));

compiler.outputFileSystem = memfs;

compiler.run(function (error, stats) {
  if (stats.hasErrors()) {
    console.log(stats.toString('minimal'));
    return;
  }

  memfs.readdirSync(config.output.path).forEach(function (file) {
    if (/\.css?$/.test(file)) {
      var target = _path2.default.join(config.output.path, file);

      _fs2.default.writeFileSync(_commander2.default.outFile, memfs.readFileSync(target));
    }
  });
});