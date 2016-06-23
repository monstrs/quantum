import jss from 'jss'
import nested from 'jss-nested'
import camelCase from 'jss-camel-case'
import vendorPrefixer from 'jss-vendor-prefixer'

jss.use(vendorPrefixer())
jss.use(camelCase())
jss.use(nested())

export function stylesToRule(styles, named = false) {
  return jss.createStyleSheet(styles, { named })
}
