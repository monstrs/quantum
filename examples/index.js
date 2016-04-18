import React from 'react'
import { render } from 'react-dom'
import Text from './components/Text'

render((
  <div>
    <Text>
      adfasd
    </Text>
    <Text red>
      adfasd
    </Text>
    <Text large>
      adfasd
    </Text>
  </div>
), document.body.appendChild(document.createElement('div')))
