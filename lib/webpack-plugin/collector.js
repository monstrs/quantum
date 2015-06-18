var styles = {};

module.exports = {
  add: function(resource, style) {
    styles[resource] = style;
  },

  source: function() {
    var result = [];
    Object.keys(styles).forEach(function(resource){
      result.push(styles[resource]);
    });

    return result.join('');
  }
};
