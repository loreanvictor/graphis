import { constants } from 'fs'
import { readdir, access } from 'fs/promises'

import { executed, loading, $ } from './util.mjs'
import { findUnscalableGlyphs } from './make-scalable.mjs'
import config from './config.mjs'


export async function findMissingGlyphs() {
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


export async function findMissingMappings() {
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


export function findDuplicateGlyphNames() {
  return config.mapping
    .map(({ name }) => name)
    .filter((name, index, names) => names.indexOf(name) !== index)
}


export function findDuplicateGlyphUnicodes() {
  return config.mapping
    .filter((glyph, index, glyphs) => glyphs.findIndex(g => g.unicode === glyph.unicode) !== index)
}


export async function validate(verbose = true) {
  const missingGlyphs = await loading('Checking missing glyphs ...', findMissingGlyphs)
  const missingMappings = await loading('Checking missing mappings ...', findMissingMappings)
  const duplicateGlyphNames = await loading('Checking duplicate glyph names ...', findDuplicateGlyphNames)
  const duplicateGlyphUnicodes = await loading('Checking duplicate glyph unicodes ...', findDuplicateGlyphUnicodes)
  const unscalableGlyphs = await loading('Checking unscalable glyphs ...', findUnscalableGlyphs)

  const success = 
    missingGlyphs.length === 0 &&
    missingMappings.length === 0 &&
    duplicateGlyphNames.length === 0 &&
    duplicateGlyphUnicodes.length === 0 &&
    unscalableGlyphs.length === 0

  let msg = ''

  if (missingGlyphs.length) {
    msg += $.error(`${missingGlyphs.length} glyphs are missing:\n`) +
      $.hint($.errlist(missingGlyphs.map(({ variation, glyph }) => `${variation.name}/${glyph.name}`))) +
      `\n`
  } else {
    msg += $.success(`All glyphs are present.\n`)
  }

  if (missingMappings.length) {
    msg += $.error(`${missingMappings.length} mappings are missing:\n`) +
      $.hint($.errlist(missingMappings)) +
      `\n`
  } else {
    msg += $.success(`All mappings are present.\n`)
  }

  if (duplicateGlyphNames.length) {
    msg += $.error(`${duplicateGlyphNames.length} glyph names are duplicated:\n`) +
      $.hint($.errlist(duplicateGlyphNames)) +
      `\n`
  } else {
    msg += $.success(`All glyph names are unique.\n`)
  }

  if (duplicateGlyphUnicodes.length) {
    msg += $.error(`${duplicateGlyphUnicodes.length} glyph unicodes are duplicated:\n`) +
      $.hint($.errlist(duplicateGlyphUnicodes.map(glyph => `${glyph.name} : ${glyph.unicode}`))) +
      `\n`
  } else {
    msg += $.success(`All glyph unicodes are unique.\n`)
  }

  if (unscalableGlyphs.length) {
    msg += $.error(`${unscalableGlyphs.length} glyphs are unscalable:\n`) +
      $.hint($.errlist(unscalableGlyphs.map(({ variation, glyph }) => `${variation.name}/${glyph.name}`))) +
      `\n`
  } else {
    msg += $.success(`All glyphs are scalable.\n`)
  }

  if (verbose) {
    console.log(msg)
  }

  return success
}


if (executed(import.meta)) {
  validate().then(success => {
    if (success) {
      console.log($.success('Font successfully validated.'))
      process.exit(0)
    } else {
      console.log($.error('Font validation failed.'))
      process.exit(1)
    }
  })
}
