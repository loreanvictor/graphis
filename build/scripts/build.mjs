import { buildSVG } from './build-svg.mjs'
import { buildTTF } from './build-ttf.mjs'
import { buildWOFF2 } from './build-woff2.mjs'
import { buildCSS } from './build-css.mjs'
import { buildZIP } from './build-zip.mjs'
import { executed, loading, rewrite, $ } from './util.mjs'


export async function buildFont() {
  const svgs = await loading('Building SVG', buildSVG)
  rewrite($.success('SVG files built: \n') + $.hint($.list(svgs)))

  const ttfs = await loading('Building TTF', buildTTF)
  rewrite($.success('TTF files built: \n') + $.hint($.list(ttfs)))

  const woff2s = await loading('Building WOFF2', buildWOFF2)
  rewrite($.success('WOFF2 files built: \n') + $.hint($.list(woff2s)))

  const css = await loading('Building CSS', buildCSS)
  rewrite($.success('CSS file built: ') + $.hint(css))

  const zip = await loading('Building ZIP', buildZIP)
  rewrite($.success('ZIP file built: ') + $.hint(zip))
}

if (executed(import.meta)) {
  buildFont()
}
