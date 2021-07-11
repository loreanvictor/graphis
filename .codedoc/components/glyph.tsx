import { ThemedComponentThis } from '@connectv/jss-theme';
import { RendererLike } from '@connectv/html';
import { CodedocTheme } from '@codedoc/core';
import { GlyphStyle } from './style';


export function Glyph(
  this: ThemedComponentThis<CodedocTheme>,
  options: any,
  renderer: RendererLike<any, any>,
  content: any,
) {
  const classes = this.theme.classes(GlyphStyle);
  return <div class={`${classes.glyph} copy-glyph`}>{content}</div>;
}
