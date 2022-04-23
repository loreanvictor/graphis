import { readdir } from 'fs/promises'

import { $ } from '../util.mjs'
import config from '../config.mjs'


export async function findMissingMappings(variation) {
  return (await readdir(variation.srcroot))
    .filter(filename => filename.endsWith('.svg'))
    .map(filename => filename.substring(0, filename.length - 4))
    .filter(glyph => !variation.mapping.some(g => g.name === glyph))
    .map(glyph => ({ variation, glyph: { name: glyph } }))
}


export async function findAllMissingMappings() {
  return (await Promise.all(config.variations.map(findMissingMappings))).flat()
}


export const missingMappings = {
  test: findMissingMappings,
  validate: glyphs => glyphs.length === 0,
  messages: {
    progress: 'Checking missing mappings ...',
    success: 'All mappings are present.',
    error: (glyphs) => `${glyphs.length} mappings are missing:\n` +
      $.hint($.errlist(glyphs.map(({ variation, glyph }) => `${variation.name}/${glyph.name}`)))
  }
}
