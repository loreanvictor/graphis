import config from '../config.mjs'
import { $ } from '../util.mjs'

import { missingGlyphs } from './missing-glyphs.mjs'
import { missingMappings } from './missing-mappings.mjs'
import { scalableGlyphs } from './scalable-glyphs.mjs'
import { duplicateGlyphNames } from './duplicate-glyph-names.mjs'
import { duplicateGlyphUnicodes } from './duplicate-glyph-unicodes.mjs'

import { runValidation } from './util.mjs'


const GENERAL_TESTS = [
  duplicateGlyphNames,
  duplicateGlyphUnicodes,
]


const TESTS = {
  scalable: scalableGlyphs,
  glyphs: missingGlyphs,
  mappings: missingMappings,
  all: [scalableGlyphs, missingGlyphs, missingMappings],
}


function fetchValidations(variation) {
  if (!variation.tests) {
    return TESTS.all
  }

  if (typeof variation.tests === 'string') {
    return [TESTS[variation.tests]].flat()
  }

  return variation.tests.map(test => TESTS[test]).filter(_ => !!_).flat()
}


export async function validateVariation(variation, verbose = true) {
  const tests = fetchValidations(variation)
  const results = []
  let valid = true

  for (const test of tests) {
    const result = await runValidation(test, [variation], verbose)
    valid = valid && test.validate(result)
    results.push(result)
  }

  return { valid, results }
}


export async function validateFont(verbose = true) {
  const results = []
  let valid = true

  for (const test of GENERAL_TESTS) {
    const result = await runValidation(test, [], verbose)
    valid = valid && test.validate(result)
    results.push({ result })
  }

  verbose && console.log()

  for (const variation of config.variations) {
    verbose && console.log($.highlight(variation.name))

    const { valid: variationValid, result } = await validateVariation(variation)
    valid = valid && variationValid
    results.push({ variation, result })

    verbose && console.log()
  }

  return { valid, results }
}
