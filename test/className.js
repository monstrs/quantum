import test from 'ava'
import { getModClassName } from '../src/className'

test('check className utils', t => {
  t.is(getModClassName('Component', 'Disabled'), 'Component--Disabled')
  t.is(getModClassName('Component', 'nested=key.value'), 'Component--NestedKeyValue')
})
