import { expect } from 'chai'
import { match } from '../../src/utils/modifier'

describe('check modifier utils', () => {
  it('check match self modifier', () => {
    expect(match('self')).to.be.true
  })

  it('check match named modifier', () => {
    expect(match('modifier', { modifier: true })).to.be.true
    expect(match('modifier', {}, { modifier: true })).to.be.true
    expect(match('modifier', {}, { modifier: ['value'] })).to.be.true
    expect(match('modifier', {}, { modifier: false })).to.be.false
    expect(match('modifier', {}, { modifier: [] })).to.be.false
    expect(match('modifier', {}, {})).to.be.false
  })

  it('check match named with value modifier', () => {
    expect(match('modifier=value', { modifier: 'value' })).to.be.true
    expect(match('modifier=value', {}, { modifier: 'value' })).to.be.true
  })
})
