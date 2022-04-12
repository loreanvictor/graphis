import { constants } from 'fs'
import { readdir, access } from 'fs/promises'

import { executed, loading, rewrite, $ } from './util.mjs'
import config from './config.mjs'


export async function validateGlyphs() {
  const missing = []

  await Promise.all(
    config.variations.map(async variation => {
      await Promise.all(
        variation.mapping.map(async glyph => {
          try {
            await access(glyph.src, constants.R_OK)
          } catch {
            missing.push({ variation, glyph })
          }
        })
      )
    })
  )

  return missing
}


export async function validateMapping() {
  const missing = []

  await Promise.all(
    config.variations.map(async variation => {
      (await readdir(variation.srcroot))
        .filter(filename => filename.endsWith('.svg'))
        .map(filename => filename.substring(0, filename.length - 4))
        .forEach(glyph => {
          if (!variation.mapping.some(g => g.name === glyph)) {
            if (!missing.includes(glyph)) {
              missing.push(glyph)
            }
          }
        })
    })
  )

  return missing
}


if (executed(import.meta)) {
  (async() => {
    await loading('Validating glyphs...', validateGlyphs).then(missing => {
      if (missing.length > 0) {
        rewrite($.error(`glyph validation failed: ${missing.length} glyphs missing.`) + 
          `\n${$.hint($.errlist(missing.map(({ variation, glyph }) => `${variation.name}/${glyph.name}`)))}`)
        process.exit(1)
      } else {
        rewrite($.success('glyph validation succeeded.'))
      }
    })

    await loading('Validating mapping...', validateMapping).then(missing => {
      if (missing.length > 0) {
        rewrite($.error(`mapping validation failed: ${missing.length} glyphs missing.`) +
          `\n${$.hint($.errlist(missing))}`)
        process.exit(1)
      } else {
        rewrite($.success('mapping validation succeeded.'))
      }
    })  

  })()
}
