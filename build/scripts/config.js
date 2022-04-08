const { join } = require('path')
const { readFileSync } = require('fs')
const { parse } = require('yaml')
const { paramCase } = require('param-case')


const root = join(__dirname, '..', '..')
const config = parse(readFileSync(join(root, 'build', 'config.yml'), 'utf8'))
const mapping = parse(readFileSync(join(root, 'build', 'mapping.yml'), 'utf8'))


module.exports = {
  ...config,
  meta: {
    ...config.meta,
    version: require('../../package.json').version,
  },
  variations: config.variations.map(variation => ({
    ...variation,
    name: variation.name || variation.src,
    dest: join(root, 'font', paramCase(config.name) + '_' + paramCase(variation.name || variation.src)),
    mapping: mapping.map(glyph => ({
      ...glyph,
      src: join(root, variation.src, glyph.name + '.svg'),
    })),
  })),
}
