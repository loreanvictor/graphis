import { fileURLToPath } from 'url'
import chalk from 'chalk'


export function executed(meta) {
  return meta && meta.url && fileURLToPath(meta.url) === process.argv[1]
}


const PREV_LINE = '\x1b[1A'
const DEL_LINE = '\x1b[2K'


export const $ = {
  loading: chalk.bold.hex('066163'),
  guide: _ => '👉 ' + _,
  highlight: chalk.bold.hex('B667F1'),
  success: _ => chalk.bold.green('✔') + ' ' + _,
  error: _ => chalk.bold.red('✕') + ' ' + chalk.hex('FF8080')(_),
  hint: chalk.hex('92A9BD'),
  fade: chalk.hex('212121'),
  list: (_, sep=chalk.bold.hex('30AADD')('*')) => _.length <= 5 ?
    _.map(__ => `  ${sep} ` + __).join('\n') :
    $.list(_.slice(0, 5), sep) + $.fade(`\n    ${_.length - 5} more...`),
  errlist: _ => $.list(_, chalk.bold.red('✕'))
}



export function rewrite(whatevs) {
  console.log(DEL_LINE + PREV_LINE + DEL_LINE + whatevs)
}



const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function loading(text, fn, opts = { timeout: 0, rewrite: true }) {
  const frames = [
    '   ', '>  ', '>> ', '>>>', '>>>', ' >>', '  >', '   ',
  ]
  let frame = 0

  console.log($.loading(frames[0]) + ' ' + text)
  const timer = setInterval(() => {
    console.log(PREV_LINE + $.loading(frames[++frame]))
    if (frame >= frames.length - 1) {
      frame = 0
    }
  }, 100)

  try {
    const res = await Promise.all([fn(), timeout((opts && opts.timeout) || 0)])
    clearInterval(timer)
    if (opts && opts.rewrite) {
      rewrite(PREV_LINE)
    }

    return res[0]
  } catch(err) {
    clearInterval(timer)
    throw err
  }
}
