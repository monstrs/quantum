import React, { Component } from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import style from '../src'

describe('check decorator', () => {
  class SimpleComponent extends Component {
    @style({
      self: {
        color: 'black',
      },
      disabled: {
        color: 'white',
      },
    })
    render() {
      return (
        <div>
          Text
        </div>
      )
    }
  }

  class ExtendedComponent extends SimpleComponent {
    @style({
      self: {
        color: 'red',
      },
    })
    render() {
      return super.render()
    }
  }

  it('simple', () => {
    expect(shallow(<SimpleComponent />).hasClass('SimpleComponent')).to.be.true
    expect(shallow(<SimpleComponent disabled />).hasClass('SimpleComponent--Disabled')).to.be.true
  })

  it('extended', () => {
    expect(shallow(<ExtendedComponent />).hasClass('ExtendedComponent')).to.be.true
  })
})
