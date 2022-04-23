import { $ } from '../util.mjs'

import config from '../config.mjs'


export function findDuplicateGlyphNames() {
  return config.mapping
    .map(({ name }) => name)
    .filter((name, index, names) => names.indexOf(name) !== index)
}


export const duplicateGlyphNames = {
  test: findDuplicateGlyphNames,
  validate: glyphNames => glyphNames.length === 0,
  messages: {
    progress: 'Checking duplicate glyph names ...',
    success: 'All glyph names are unique.',
    error: (glyphNames) => `${glyphNames.length} glyph names are duplicated:\n` +
      $.hint($.errlist(glyphNames))
  }
}
