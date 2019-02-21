import React from 'react'
import { PropsOf } from '@emotion/styled-base/types/helper'

export interface CreateStyledProxyComponentBase<InnerProps> {
  (styles: any): any // tslint:disable-line callable-types
}

export interface CreateStyledProxyComponentExtrinsic<
  Tag extends React.ComponentType<any>
> extends CreateStyledProxyComponentBase<PropsOf<Tag>> {}

export interface CreateStyledProxyComponentIntrinsic<
  Tag extends keyof JSX.IntrinsicElements
> extends CreateStyledProxyComponentBase<JSX.IntrinsicElements[Tag]> {}

export interface StyledTags {
  /**
   * @desc
   * HTML tags
   */
  a: CreateStyledProxyComponentIntrinsic<'a'>
  abbr: CreateStyledProxyComponentIntrinsic<'abbr'>
  address: CreateStyledProxyComponentIntrinsic<'address'>
  area: CreateStyledProxyComponentIntrinsic<'area'>
  article: CreateStyledProxyComponentIntrinsic<'article'>
  aside: CreateStyledProxyComponentIntrinsic<'aside'>
  audio: CreateStyledProxyComponentIntrinsic<'audio'>
  b: CreateStyledProxyComponentIntrinsic<'b'>
  base: CreateStyledProxyComponentIntrinsic<'base'>
  bdi: CreateStyledProxyComponentIntrinsic<'bdi'>
  bdo: CreateStyledProxyComponentIntrinsic<'bdo'>
  big: CreateStyledProxyComponentIntrinsic<'big'>
  blockquote: CreateStyledProxyComponentIntrinsic<'blockquote'>
  body: CreateStyledProxyComponentIntrinsic<'body'>
  br: CreateStyledProxyComponentIntrinsic<'br'>
  button: CreateStyledProxyComponentIntrinsic<'button'>
  canvas: CreateStyledProxyComponentIntrinsic<'canvas'>
  caption: CreateStyledProxyComponentIntrinsic<'caption'>
  cite: CreateStyledProxyComponentIntrinsic<'cite'>
  code: CreateStyledProxyComponentIntrinsic<'code'>
  col: CreateStyledProxyComponentIntrinsic<'col'>
  colgroup: CreateStyledProxyComponentIntrinsic<'colgroup'>
  data: CreateStyledProxyComponentIntrinsic<'data'>
  datalist: CreateStyledProxyComponentIntrinsic<'datalist'>
  dd: CreateStyledProxyComponentIntrinsic<'dd'>
  del: CreateStyledProxyComponentIntrinsic<'del'>
  details: CreateStyledProxyComponentIntrinsic<'details'>
  dfn: CreateStyledProxyComponentIntrinsic<'dfn'>
  dialog: CreateStyledProxyComponentIntrinsic<'dialog'>
  div: CreateStyledProxyComponentIntrinsic<'div'>
  dl: CreateStyledProxyComponentIntrinsic<'dl'>
  dt: CreateStyledProxyComponentIntrinsic<'dt'>
  em: CreateStyledProxyComponentIntrinsic<'em'>
  embed: CreateStyledProxyComponentIntrinsic<'embed'>
  fieldset: CreateStyledProxyComponentIntrinsic<'fieldset'>
  figcaption: CreateStyledProxyComponentIntrinsic<'figcaption'>
  figure: CreateStyledProxyComponentIntrinsic<'figure'>
  footer: CreateStyledProxyComponentIntrinsic<'footer'>
  form: CreateStyledProxyComponentIntrinsic<'form'>
  h1: CreateStyledProxyComponentIntrinsic<'h1'>
  h2: CreateStyledProxyComponentIntrinsic<'h2'>
  h3: CreateStyledProxyComponentIntrinsic<'h3'>
  h4: CreateStyledProxyComponentIntrinsic<'h4'>
  h5: CreateStyledProxyComponentIntrinsic<'h5'>
  h6: CreateStyledProxyComponentIntrinsic<'h6'>
  head: CreateStyledProxyComponentIntrinsic<'head'>
  header: CreateStyledProxyComponentIntrinsic<'header'>
  hgroup: CreateStyledProxyComponentIntrinsic<'hgroup'>
  hr: CreateStyledProxyComponentIntrinsic<'hr'>
  html: CreateStyledProxyComponentIntrinsic<'html'>
  i: CreateStyledProxyComponentIntrinsic<'i'>
  iframe: CreateStyledProxyComponentIntrinsic<'iframe'>
  img: CreateStyledProxyComponentIntrinsic<'img'>
  input: CreateStyledProxyComponentIntrinsic<'input'>
  ins: CreateStyledProxyComponentIntrinsic<'ins'>
  kbd: CreateStyledProxyComponentIntrinsic<'kbd'>
  keygen: CreateStyledProxyComponentIntrinsic<'keygen'>
  label: CreateStyledProxyComponentIntrinsic<'label'>
  legend: CreateStyledProxyComponentIntrinsic<'legend'>
  li: CreateStyledProxyComponentIntrinsic<'li'>
  link: CreateStyledProxyComponentIntrinsic<'link'>
  main: CreateStyledProxyComponentIntrinsic<'main'>
  map: CreateStyledProxyComponentIntrinsic<'map'>
  mark: CreateStyledProxyComponentIntrinsic<'mark'>
  /**
   * @desc
   * marquee tag is not supported by @types/react
   */
  // 'marquee': CreateStyledProxyComponentIntrinsic<'marquee'>;
  menu: CreateStyledProxyComponentIntrinsic<'menu'>
  menuitem: CreateStyledProxyComponentIntrinsic<'menuitem'>
  meta: CreateStyledProxyComponentIntrinsic<'meta'>
  meter: CreateStyledProxyComponentIntrinsic<'meter'>
  nav: CreateStyledProxyComponentIntrinsic<'nav'>
  noscript: CreateStyledProxyComponentIntrinsic<'noscript'>
  object: CreateStyledProxyComponentIntrinsic<'object'>
  ol: CreateStyledProxyComponentIntrinsic<'ol'>
  optgroup: CreateStyledProxyComponentIntrinsic<'optgroup'>
  option: CreateStyledProxyComponentIntrinsic<'option'>
  output: CreateStyledProxyComponentIntrinsic<'output'>
  p: CreateStyledProxyComponentIntrinsic<'p'>
  param: CreateStyledProxyComponentIntrinsic<'param'>
  picture: CreateStyledProxyComponentIntrinsic<'picture'>
  pre: CreateStyledProxyComponentIntrinsic<'pre'>
  progress: CreateStyledProxyComponentIntrinsic<'progress'>
  q: CreateStyledProxyComponentIntrinsic<'q'>
  rp: CreateStyledProxyComponentIntrinsic<'rp'>
  rt: CreateStyledProxyComponentIntrinsic<'rt'>
  ruby: CreateStyledProxyComponentIntrinsic<'ruby'>
  s: CreateStyledProxyComponentIntrinsic<'s'>
  samp: CreateStyledProxyComponentIntrinsic<'samp'>
  script: CreateStyledProxyComponentIntrinsic<'script'>
  section: CreateStyledProxyComponentIntrinsic<'section'>
  select: CreateStyledProxyComponentIntrinsic<'select'>
  small: CreateStyledProxyComponentIntrinsic<'small'>
  source: CreateStyledProxyComponentIntrinsic<'source'>
  span: CreateStyledProxyComponentIntrinsic<'span'>
  strong: CreateStyledProxyComponentIntrinsic<'strong'>
  style: CreateStyledProxyComponentIntrinsic<'style'>
  sub: CreateStyledProxyComponentIntrinsic<'sub'>
  summary: CreateStyledProxyComponentIntrinsic<'summary'>
  sup: CreateStyledProxyComponentIntrinsic<'sup'>
  table: CreateStyledProxyComponentIntrinsic<'table'>
  tbody: CreateStyledProxyComponentIntrinsic<'tbody'>
  td: CreateStyledProxyComponentIntrinsic<'td'>
  textarea: CreateStyledProxyComponentIntrinsic<'textarea'>
  tfoot: CreateStyledProxyComponentIntrinsic<'tfoot'>
  th: CreateStyledProxyComponentIntrinsic<'th'>
  thead: CreateStyledProxyComponentIntrinsic<'thead'>
  time: CreateStyledProxyComponentIntrinsic<'time'>
  title: CreateStyledProxyComponentIntrinsic<'title'>
  tr: CreateStyledProxyComponentIntrinsic<'tr'>
  track: CreateStyledProxyComponentIntrinsic<'track'>
  u: CreateStyledProxyComponentIntrinsic<'u'>
  ul: CreateStyledProxyComponentIntrinsic<'ul'>
  var: CreateStyledProxyComponentIntrinsic<'var'>
  video: CreateStyledProxyComponentIntrinsic<'video'>
  wbr: CreateStyledProxyComponentIntrinsic<'wbr'>

  /**
   * @desc
   * SVG tags
   */
  circle: CreateStyledProxyComponentIntrinsic<'circle'>
  clipPath: CreateStyledProxyComponentIntrinsic<'clipPath'>
  defs: CreateStyledProxyComponentIntrinsic<'defs'>
  ellipse: CreateStyledProxyComponentIntrinsic<'ellipse'>
  foreignObject: CreateStyledProxyComponentIntrinsic<'foreignObject'>
  g: CreateStyledProxyComponentIntrinsic<'g'>
  image: CreateStyledProxyComponentIntrinsic<'image'>
  line: CreateStyledProxyComponentIntrinsic<'line'>
  linearGradient: CreateStyledProxyComponentIntrinsic<'linearGradient'>
  mask: CreateStyledProxyComponentIntrinsic<'mask'>
  path: CreateStyledProxyComponentIntrinsic<'path'>
  pattern: CreateStyledProxyComponentIntrinsic<'pattern'>
  polygon: CreateStyledProxyComponentIntrinsic<'polygon'>
  polyline: CreateStyledProxyComponentIntrinsic<'polyline'>
  radialGradient: CreateStyledProxyComponentIntrinsic<'radialGradient'>
  rect: CreateStyledProxyComponentIntrinsic<'rect'>
  stop: CreateStyledProxyComponentIntrinsic<'stop'>
  svg: CreateStyledProxyComponentIntrinsic<'svg'>
  text: CreateStyledProxyComponentIntrinsic<'text'>
  tspan: CreateStyledProxyComponentIntrinsic<'tspan'>
}

export interface CreateStyledProxy {
  <Tag extends React.ComponentType<any>>(
    tag: Tag
  ): CreateStyledProxyComponentExtrinsic<Tag>

  <Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag
  ): CreateStyledProxyComponentIntrinsic<Tag>
}

export interface CreateStyledProxyWithTags
  extends CreateStyledProxy,
    StyledTags {}
