import { match } from '../match'

describe('match', () => {
  it('self modifier', () => {
    expect(match('self')).toBe(true)
  })

  it('named modifier', () => {
    expect(match('modifier', { modifier: true })).toBe(true)
    expect(match('modifier', { modifier: ['value'] })).toBe(true)
  })

  it('named with value modifier', () => {
    expect(match('modifier=value', { modifier: 'value' })).toBe(true)
  })
})
