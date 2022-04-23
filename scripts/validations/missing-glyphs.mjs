import { constants } from 'fs'
import { access } from 'fs/promises'

import { $ } from '../util.mjs'
import config from '../config.mjs'


export async function findMissingGlyphs(variation) {
  return (await Promise.all(variation.mapping.map(async glyph => {
    try {
      await access(glyph.src, constants.R_OK)
    } catch {
      return { variation, glyph }
    }
  }))).filter(_ => !!_)
}


export async function findAllMissingGlyphs() {
  return (await Promise.all(config.variations.map(findMissingGlyphs))).flat()
}


export const missingGlyphs = {
  test: findMissingGlyphs,
  validate: glyphs => glyphs.length === 0,
  messages: {
    progress: 'Checking missing glyphs ...',
    success: 'All glyphs are present.',
    error: (glyphs) => `${glyphs.length} glyphs are missing:\n` +
      $.hint($.errlist(glyphs.map(({ variation, glyph }) => `${variation.name}/${glyph.name}`)))
  }
}
