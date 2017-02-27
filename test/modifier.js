import test from 'ava'
import { match } from '../src/modifier'

test('match self modifier', t => {
  t.true(match('self'))
})

test('match named modifier', t => {
  t.true(match('modifier', { modifier: true }))
  t.true(match('modifier', {}, { modifier: true }))
  t.true(match('modifier', {}, { modifier: ['value'] }))
  t.false(match('modifier', {}, { modifier: false }))
  t.false(match('modifier', {}, { modifier: [] }))
  t.false(match('modifier', {}, {}))
})

test('check match named with value modifier', t => {
  t.true(match('modifier=value', { modifier: 'value' }))
  t.true(match('modifier=value', {}, { modifier: 'value' }))
})
