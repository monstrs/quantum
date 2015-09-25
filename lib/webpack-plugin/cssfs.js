'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _unionfs = require('unionfs');

var _unionfs2 = _interopRequireDefault(_unionfs);

var _memfs = require('memfs');

var _memfs2 = _interopRequireDefault(_memfs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var cssfs = new _unionfs2['default'].UnionFS();
var mem = new _memfs2['default'].Volume();

mem.mountSync('/cssfs', {});

cssfs.init().use(_fs2['default']).use(mem).replace(_fs2['default']);

exports['default'] = cssfs;
module.exports = exports['default'];