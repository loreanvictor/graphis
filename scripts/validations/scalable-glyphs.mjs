import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import { readFile, writeFile } from 'fs/promises'

import { $ } from '../util.mjs'
import config from '../config.mjs'


const XML_CONFIG = { ignoreAttributes: false, allowBooleanAttributes: true, format: true }
const parser = new XMLParser(XML_CONFIG)
const builder = new XMLBuilder(XML_CONFIG)


export async function checkScalability(glyph) {
  try {
    const file = await readFile(glyph.src, 'utf8')
    const xml = parser.parse(file)
  
    if ('@_width' in xml.svg || '@_height' in xml.svg) {
      return false
    } else {
      return true
    }
  } catch {
    // if the file doesn't exist, then the issue isn't scalability
    return true
  }
}


export async function findUnscalableGlyphs(variation) {
  return (await Promise.all(
    variation.mapping.map(async glyph => {
      if (!await checkScalability(glyph)) {
        return { variation, glyph }
      }
    })
  )).filter(_ => !!_)
}


export async function findAllUnscalableGlyphs() {
  return (await Promise.all(config.variations.map(findUnscalableGlyphs))).flat()
}


export async function makeGlyphScalable(glyph) {
  try {
    const file = await readFile(glyph.src, 'utf-8')
    const xml = parser.parse(file)
  
    if ('@_width' in xml.svg || '@_height' in xml.svg) {
      delete xml.svg['@_width']
      delete xml.svg['@_height']
  
      const newFile = builder.build(xml)
      await writeFile(glyph.src, newFile, 'utf-8')
    }
  } catch {
    // ignore non-existing files
  }
}


export async function makeAllGlyphsScalable() {
  await Promise.all(
    config.variations.map(async variation => {
      await Promise.all(
        variation.mapping.map(makeGlyphScalable)
      )
    })
  )
}


export const scalableGlyphs = {
  test: findUnscalableGlyphs,
  validate: glyphs => glyphs.length === 0,
  messages: {
    progress: 'Checking scalable glyphs ...',
    success: 'All glyphs are scalable.',
    error: (glyphs) => `${glyphs.length} glyphs are not scalable:\n` +
      $.hint($.errlist(glyphs.map(({ variation, glyph }) => `${variation.name}/${glyph.name}`))) +
      '\n  ' + $.guide($.hint(`Run ${$.highlight('npm run prep')} to make all glyphs scalable.`))
  }
}
