import React from 'react'
import { render } from 'react-dom'
import Text from './components/Text'

render((
  <div>
    <Text>
      Text
    </Text>
    <Text red>
      Red text
    </Text>
    <Text large>
      Large text
    </Text>
  </div>
), document.body.appendChild(document.createElement('div')))
