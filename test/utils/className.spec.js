import { expect } from 'chai'
import { getModClassName, getMethodClassName, getMethodGetterName } from '../../src/utils/className'

describe('check className utils', () => {
  it('getModClassName', () => {
    expect(getModClassName('Component', 'Disabled')).to.equal('Component--Disabled')
    expect(getModClassName('Component', 'nested=key.value')).to.equal('Component--NestedKeyValue')
  })

  it('getMethodClassName', () => {
    expect(getMethodClassName('Component', 'Button')).to.equal('ComponentButton')
  })

  it('check getMethodGetterName', () => {
    expect(getMethodGetterName('renderButton')).to.equal('getButtonClassName')
  })
})
