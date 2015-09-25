import path from 'path'
import { expect } from 'chai'
import transform from './../src/webpack-plugin/transform'

describe('check transform source', () => {
  function transformFuxture(name) {
    const fixtureFilepath = path.resolve(__dirname, 'fixtures', `${name}.js`)

    const result = require('babel').transformFileSync(fixtureFilepath, {
      stage: 0
    })

    return transform(result.code, null, name)
  }

  it('check extract styles', () => {
    var result = transformFuxture('TestComponent')

    expect(result.css).to.contain('.TestComponent')
    expect(result.css).to.contain('.TestComponent-Element')
    expect(result.css).to.contain('.TestComponent-Element--Modifier')
    expect(result.css).to.contain('.TestComponent-Element--ModifierValue')
  })

  it('check inject style declaration', () => {
    var result = transformFuxture('TestComponent')

    expect(result.code).to.contain('"self": "TestComponent"')
    expect(result.code).to.contain('"self": "TestComponent-Element"')
    expect(result.code).to.contain('"modifier": "TestComponent-Element--Modifier"')
    expect(result.code).to.contain('"modifier=value": "TestComponent-Element--ModifierValue"')
  })

  it('check inject class name getters', () => {
    var result = transformFuxture('TestComponent')

    expect(result.code).to.contain('className: this.getClassName()')
    expect(result.code).to.contain('className: this.getElementClassName()')
  })
})
