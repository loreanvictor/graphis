import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { parse } from 'yaml'
import { paramCase } from 'param-case'


const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const destroot = join(root, 'font')
const config = parse(readFileSync(join(root, 'config.yml'), 'utf8'))
const mapping = parse(readFileSync(join(root, 'mapping.yml'), 'utf8'))

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))

export default {
  ...config,
  mapping,
  dest: join(destroot, paramCase(config.name)),
  destroot,
  meta: {
    ...config.meta,
    version: pkg.version,
  },
  variations: config.variations.map(variation => ({
    ...variation,
    name: variation.name || variation.src,
    srcroot: join(root, variation.src),
    dest: join(destroot, paramCase(config.name) + '_' + paramCase(variation.name || variation.src)),
    mapping: mapping.map(glyph => ({
      ...glyph,
      src: join(root, variation.src, glyph.name + '.svg'),
    })),
  })),
}
