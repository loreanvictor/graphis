import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import { readFile, writeFile } from 'fs/promises'

import config from './config.mjs'


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


export async function findUnscalableGlyphs() {
  const unscalable = []

  await Promise.all(
    config.variations.map(async variation => {
      await Promise.all(
        variation.mapping.map(async glyph => {
          if (!await checkScalability(glyph)) {
            unscalable.push({ variation, glyph })
          }
        })
      )
    })
  )

  return  unscalable
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
