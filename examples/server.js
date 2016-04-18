/* eslint-disable no-console */
import Express from 'express'
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import * as config from './webpack.config'

const compiler = webpack(config)
const app = new Express()

app.use(devMiddleware(compiler, { noInfo: true }))
app.use(hotMiddleware(compiler))

app.listen(3030, error => {
  if (error) {
    throw error
  }

  console.info('Webpack development server listening on port %s', 3030)
})

