import React, { Component } from 'react'
import style from 'quantum'

class TestComponent extends Component {
  @style({
    self: {
      color: 'black'
    },
    modifier: {
      color: 'red'
    },
    'modifier=value': {
      color: 'green'
    }
  })
  renderElement() {
    return (
      <div>
        Element
      </div>
    )
  }

  @style({
    self: {
      background: 'white'
    }
  })
  render() {
    return (
      <div {...this.props}>
        {this.renderElement()}
      </div>
    )
  }
}
