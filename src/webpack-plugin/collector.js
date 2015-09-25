const styles = {}

module.exports = {
  add: function add(resource, style) {
    styles[resource] = style
  },

  source: function source() {
    return Object.keys(styles).map(resource => styles[resource]).join('')
  },
}
