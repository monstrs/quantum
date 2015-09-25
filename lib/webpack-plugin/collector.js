'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var styles = {};

module.exports = {
  add: function add(resource, style) {
    styles[resource] = style;
  },

  source: function source() {
    return _Object$keys(styles).map(function (resource) {
      return styles[resource];
    }).join('');
  }
};