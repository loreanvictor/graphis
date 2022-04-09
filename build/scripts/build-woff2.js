const { readFileSync, writeFileSync } = require('fs')
const ttf2woff2 = require('ttf2woff2')

const config = require('./config')


function buildVariation(variation) {
  const woff2 = ttf2woff2(readFileSync(variation.dest + '.ttf'))
  writeFileSync(variation.dest + '.woff2', woff2)
  console.log(`${config.name} ${variation.name} built`)
}

config.variations.forEach(buildVariation)
