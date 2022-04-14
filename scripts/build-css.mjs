import { writeFile } from 'fs/promises'

import config from './config.mjs'
import { executed } from './util.mjs'


const WEIGHT_MAPPING = {
  'Bold': 'bold',
  'Regular': 'normal',
  'Light': 'lighter'
}

function buildVariationSegment(variation) {
  return `@font-face {
  font-family: '${config.name}';
  font-weight: ${WEIGHT_MAPPING[variation.weight] || variation.weight.toLowerCase()};
  src: url('${(variation.dest + '.woff2').substring(config.destroot.length + 1)}');
  src: url('${(variation.dest + '.woff2').substring(config.destroot.length + 1)}') format('woff2'),
        url('${(variation.dest + '.ttf').substring(config.destroot.length + 1)}') format('truetype');
  font-display: block;
}`
}


export async function buildCSS() {
  const css = config.variations.map(buildVariationSegment).join('\n\n')
  const dest = `${config.dest}.css`
  await writeFile(dest, css)

  return dest
}


if (executed(import.meta)) {
  buildCSS()
}
