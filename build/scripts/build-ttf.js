const { readFileSync, writeFileSync } = require('fs')
const svg2ttf = require('svg2ttf')
const semver = require('semver')

const config = require('./config')


function buildVariation(variation) {
  const ttf = svg2ttf(readFileSync(variation.dest + '.svg', 'utf8'), {
    copyright: config.meta.copyright,
    description: config.meta.description,
    url: config.meta.url,
    version: semver.major(config.meta.version) + '.' + semver.minor(config.meta.version),
  })

  writeFileSync(variation.dest + '.ttf', Buffer.from(ttf.buffer))
  console.log(`${config.name} ${variation.name} built`)
}

config.variations.forEach(buildVariation)
