'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _unionfs = require('unionfs');

var _unionfs2 = _interopRequireDefault(_unionfs);

var _memfs = require('memfs');

var _memfs2 = _interopRequireDefault(_memfs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cssfs = new _unionfs2.default.UnionFS();
var mem = new _memfs2.default.Volume();

mem.mountSync('/cssfs', {});

cssfs.init().use(mem);

exports.default = cssfs;