import path from 'path'
import { expect } from 'chai'
import { transformFileSync } from 'babel-core'
import plugin, { extractStyles } from '../../src/babel/plugin'

describe('check babel compile styles plugin', () => {
  const config = {
    presets: [
      'es2015',
      'stage-0',
    ],
    plugins: [
      plugin,
    ],
  }

  it('transform styles to class map', () => {
    const { code } = transformFileSync(path.resolve(__dirname, './fixtures/Base.js'), config)

    expect(code).to.contain('createClassMap')
    expect(code).to.contain('self\':')
  })

  it('extract styles', () => {
    const { code } = transformFileSync(path.resolve(__dirname, './fixtures/Base.js'), config)

    expect(extractStyles(code)).to.contain('Base')
    expect(extractStyles(code)).to.contain('background: \'red\'')
  })
})
