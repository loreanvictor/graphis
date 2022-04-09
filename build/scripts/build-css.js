const { writeFileSync } = require('fs')

const config = require('./config')


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


const css = config.variations.map(buildVariationSegment).join('\n\n')
writeFileSync(`${config.dest}.css`, css)
