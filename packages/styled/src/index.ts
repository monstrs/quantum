import { CreateStyledProxyWithTags, CreateStyledProxy } from './types'
import { Tags } from './tags'
import styled from './styled'

const newStyled: CreateStyledProxy = styled.bind(null)

Object.keys(Tags).forEach(tagName => {
  newStyled[tagName] = newStyled(tagName as keyof JSX.IntrinsicElements)
})

export default newStyled as CreateStyledProxyWithTags
