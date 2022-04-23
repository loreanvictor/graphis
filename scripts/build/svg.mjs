import FontStream from 'svgicons2svgfont'
import { createReadStream, createWriteStream } from 'fs'

import config from '../config.mjs'
import { executed } from '../util.mjs'


export async function buildVariation(variation) {
  return new Promise((resolve, reject) => {
    const conf = {
      fontName: config.name,
      fontId: config.name + ' ' + variation.name,
      metadata: JSON.stringify(config.meta),
      log: () => {},
    }
  
    if (config.metrics && config.metrics.height) conf['fontHeight'] = config.metrics.height
    if (config.metrics && config.metrics.descent) conf['descent'] = config.metrics.descent
    if (config.metrics && config.metrics.ascent) conf['ascent'] = config.metrics.ascent
  
    if (variation.weight) conf['fontWeight'] = variation.weight
    if (variation.style) conf['fontStyle'] = variation.style
  
    const font = new FontStream(conf)
  
    font.pipe(createWriteStream(variation.dest + '.svg'))
    .on('finish', () => resolve(variation.dest + '.svg'))
    .on('error', err => reject(err))
  
    variation.mapping.forEach(glyph => {
      const G = createReadStream(glyph.src)
      G.metadata = {
        unicode: [glyph.unicode],
        name: glyph.name,
      }
  
      font.write(G)
    })
  
    font.end()
  })
}


export async function buildSVG() {
  return Promise.all(config.buildVariations.map(buildVariation))
}


if (executed(import.meta)) {
  buildSVG()
}
