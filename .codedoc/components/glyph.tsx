import { ThemedComponentThis } from '@connectv/jss-theme';
import { RendererLike } from '@connectv/html';
import { CodedocTheme } from '@codedoc/core';
import { GlyphStyle } from './style';
import { GlyphSearch$ } from './glyph-search';


export function Glyph(
  this: ThemedComponentThis<CodedocTheme>,
  options: { tag?: string },
  renderer: RendererLike<any, any>,
  content: any,
) {
  const classes = this.theme.classes(GlyphStyle);
  return <div class={`${classes.glyph} copy-glyph`} data-tag={options.tag || ''}>{content}</div>;
}

export function GlyphHolder(
  this: ThemedComponentThis<CodedocTheme>,
  _: any,
  renderer: RendererLike<any, any>,
  content: any,
) {
  const classes = this.theme.classes(GlyphStyle);
  return <div class={`${classes.glyphHolder} medium`}>
    <GlyphSearch$/>
    {content}
  </div>;
}
