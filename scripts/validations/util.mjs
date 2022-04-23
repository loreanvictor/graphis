import { $, loading } from '../util.mjs'


export async function runValidation(validation, params = [], verbose = true) {
  const { test, messages, validate } = validation
  const { progress, success, error } = messages

  const res = verbose ? await loading(progress, () => test(...params)) : await test(...params)
  const valid = validate(res)

  if (verbose) {
    if (valid) {
      console.log($.success(success))
    } else {
      console.log($.error(error(res)))
    }
  }

  return res
}
