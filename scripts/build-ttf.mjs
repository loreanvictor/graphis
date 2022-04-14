import { readFile, writeFile } from 'fs/promises'
import svg2ttf from 'svg2ttf'
import semver from 'semver'

import config from './config.mjs'
import { executed } from './util.mjs'


async function buildVariation(variation) {
  const file = await readFile(variation.dest + '.svg', 'utf8')
  const ttf = svg2ttf(file, {
    copyright: config.meta.copyright,
    description: config.meta.description,
    url: config.meta.url,
    version: semver.major(config.meta.version) + '.' + semver.minor(config.meta.version),
  })

  const dest = variation.dest + '.ttf'
  await writeFile(dest, Buffer.from(ttf.buffer))

  return dest
}


export async function buildTTF() {
  return Promise.all(config.variations.map(buildVariation))
}


if (executed(import.meta)) {
  buildTTF()
}
