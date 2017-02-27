import test from 'ava'
import { StyleSheet } from '../src'

const styles = {
  self: {
    color: 'black',
  },
  disabled: {
    color: 'white',
  },
}

test('create style sheet', t => {
  const css = StyleSheet.create(styles)

  t.true(css().includes('self'))
  t.true(css({ disabled: true }).includes('disabled'))
})

test('create named style sheet', t => {
  const css = StyleSheet.createNamed('Button', styles)

  t.is(css(), 'Button')
  t.is(css({ disabled: true }), 'Button Button--Disabled')
})
