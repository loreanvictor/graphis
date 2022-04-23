import { executed, $ } from './util.mjs'
import { validateFont } from './validations/index.mjs'


if (executed(import.meta)) {
  validateFont().then(result => {
    if (result.valid) {
      console.log($.success('Font successfully validated.'))
      process.exit(0)
    } else {
      console.log($.error('Font validation failed.'))
      process.exit(1)
    }
  })
}


export { validateFont } from './validations/index.mjs'