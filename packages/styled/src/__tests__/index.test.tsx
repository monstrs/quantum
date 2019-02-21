import React from 'react'
import serializer from 'jest-emotion'
import renderer from 'react-test-renderer'
import styled from '../index'

expect.addSnapshotSerializer(serializer)

describe('styled', () => {
  describe('snapshot base', () => {
    it('should match latest render snapshot', () => {
      const Base = styled.div({
        self: {
          background: 'red',
        },
      })

      const base = renderer.create(<Base />).toJSON()

      expect(base).toMatchSnapshot()
    })
  })
})
