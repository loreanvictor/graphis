import { $ } from '../util.mjs'

import config from '../config.mjs'


export function findDuplicateGlyphUnicodes() {
  return config.mapping
    .filter((glyph, index, glyphs) => glyphs.findIndex(g => g.unicode === glyph.unicode) !== index)
}


export const duplicateGlyphUnicodes = {
  test: findDuplicateGlyphUnicodes,
  validate: glyphs => glyphs.length === 0,
  messages: {
    progress: 'Checking duplicate glyph unicodes ...',
    success: 'All glyph unicodes are unique.',
    error: (glyphs) => `${glyphs.length} glyph unicodes are duplicated:\n` +
      $.hint($.errlist(glyphs.map(({ name, unicode }) => `${name} : ${unicode}`)))
  }
}
