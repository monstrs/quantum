'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _transform = require('./transform');

var _transform2 = _interopRequireDefault(_transform);

var _classNameFromPath = require('./classNameFromPath');

var _classNameFromPath2 = _interopRequireDefault(_classNameFromPath);

var _cssfs = require('./cssfs');

var _cssfs2 = _interopRequireDefault(_cssfs);

function loader(src, map) {
  var _this = this;

  if (this && this.cacheable) {
    this.cacheable();
  }

  if (/_createDecoratedClass/.exec(src) && /quantum/.exec(src)) {
    var options = this.options.quantum || {};
    var className = (0, _classNameFromPath2['default'])(this.resourcePath, options);
    var theme = {};

    if (options.theme && _fs2['default'].existsSync(options.theme)) {
      theme = require(options.theme);
    }

    var result = (0, _transform2['default'])(src, map, className, theme);

    var code = result.code;

    if (result.css.length > 0) {
      var pattern;

      (function () {
        var time = new Date().valueOf().toString();
        var target = '/cssfs' + _this.resourcePath.replace('.js', '-' + time + '.css');
        var targetParts = target.split('/');

        var _targetParts$pop$split = targetParts.pop().split('-');

        var _targetParts$pop$split2 = _slicedToArray(_targetParts$pop$split, 1);

        var filename = _targetParts$pop$split2[0];

        var dirname = targetParts.join('/');

        pattern = new RegExp('^' + filename + '-(\\d+).css');

        _cssfs2['default'].readdirSync(dirname).forEach(function (file) {
          if (pattern.test(file)) {
            _cssfs2['default'].unlinkSync(dirname + '/' + file);
          }
        });

        _cssfs2['default'].appendFileSync(target, result.css);

        code += '\nrequire(\'' + target + '\')';
      })();
    }

    return this.callback(null, code, result.map);
  }

  this.callback(null, src, map);
}

exports['default'] = loader;
module.exports = exports['default'];