import path from 'path'
import { expect } from 'chai'
import { modifierMatch } from './../src/utils'

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
})
