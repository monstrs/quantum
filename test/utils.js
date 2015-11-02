import path from 'path'
import { expect } from 'chai'
import { modifierMatch, injectThemeVariables, modifierToAttribute } from './../src/utils'

describe('check utils', () => {
  it('check match self modifier', () => {
    expect(modifierMatch('self')).to.be.true
  })

  it('check match named modifier', () => {
    expect(modifierMatch('modifier', { modifier: true })).to.be.true
    expect(modifierMatch('modifier', {}, { modifier: true })).to.be.true
  })

  it('check match named with value modifier', () => {
    expect(modifierMatch('modifier=value', { modifier: 'value' })).to.be.true
    expect(modifierMatch('modifier=value', {}, { modifier: 'value' })).to.be.true
  })

  it('check transform theme variables', () => {
    const theme = { border: { width: '1px', color: 'red' } }

    expect(injectThemeVariables('$border.color', theme)).to.eq('red')
    expect(injectThemeVariables('$border.width solid $border.color', theme)).to.eq('1px solid red')
  })

  it('check transform modifier to attribute name', () => {
    expect(modifierToAttribute('borderRightWidth')).to.eq('border-right-width')
  })
})
