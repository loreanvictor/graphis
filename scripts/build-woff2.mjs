import { readFile, writeFile } from 'fs/promises'
import ttf2woff2 from 'ttf2woff2'

import config from './config.mjs'
import { executed } from './util.mjs'


async function buildVariation(variation) {
  const file = await readFile(variation.dest + '.ttf')
  const woff2 = ttf2woff2(file)
  const dest = variation.dest + '.woff2'
  await writeFile(dest, woff2)
  
  return dest
}


export async function buildWOFF2() {
  return Promise.all(config.variations.map(buildVariation))
}


if (executed(import.meta)) {
  buildWOFF2()
}
