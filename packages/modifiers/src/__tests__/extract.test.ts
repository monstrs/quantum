import { extract } from '../extract'

describe('extract', () => {
  it('skip self modifier', () => {
    expect(extract({ self: {} })).toEqual([])
  })

  it('named modifier', () => {
    expect(extract({ self: {}, modifier: {} })).toEqual(['modifier'])
  })

  it('named with value modifier', () => {
    expect(extract({ self: {}, 'modifier=value': {} })).toEqual(['modifier'])
  })
})
