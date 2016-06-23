import { expect } from 'chai'
import { StyleSheet } from '../src'

describe('check StyleSheet', () => {
  const styles = {
    self: {
      color: 'black',
    },
    disabled: {
      color: 'white',
    },
  }

  it('create', () => {
    const css = StyleSheet.create(styles)

    expect(css()).to.contain('self')
    expect(css({ disabled: true })).to.contain('disabled')
  })

  it('create named', () => {
    const css = StyleSheet.createNamed('Button', styles)

    expect(css()).to.equal('Button')
    expect(css({ disabled: true })).to.equal('Button Button--Disabled')
  })
})
