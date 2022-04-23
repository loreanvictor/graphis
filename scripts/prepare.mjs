import { executed, loading, $ } from './util.mjs'
import { makeAllGlyphsScalable } from './validations/scalable-glyphs.mjs'


export async function prepare() {
  await loading('Making all glyphs scalable ...', makeAllGlyphsScalable)
  console.log($.success('All glyphs are scalable.'))
}


if (executed(import.meta)) {
  prepare()
}
