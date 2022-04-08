const FontStream = require('svgicons2svgfont')
const { createReadStream, createWriteStream } = require('fs')

const config = require('./config')


function buildVariation(variation) {
  const conf = {
    fontName: config.name,
    metadata: JSON.stringify(config.meta),
  }

  if (config.metrics && config.metrics.height) conf['fontHeight'] = config.metrics.height
  if (config.metrics && config.metrics.descent) conf['descent'] = config.metrics.descent
  if (config.metrics && config.metrics.ascent) conf['ascent'] = config.metrics.ascent

  if (variation.weight) conf['fontWeight'] = variation.weight
  if (variation.style) conf['fontStyle'] = variation.style

  const font = new FontStream(conf)

  font.pipe(createWriteStream(variation.dest + '.svg'))
  .on('finish', () => console.log(`${config.name} ${variation.name} built`))
  .on('error', err => {
    console.log(`building ${config.name} ${variation.name} failed:`)
    console.log(err)
  })

  variation.mapping.forEach(glyph => {
    const G = createReadStream(glyph.src)
    G.metadata = {
      unicode: [glyph.unicode],
      name: glyph.name,
    }

    font.write(G)
  })

  font.end()
}


config.variations.forEach(buildVariation)
