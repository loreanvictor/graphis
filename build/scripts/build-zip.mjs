import archiver from 'archiver'
import { createWriteStream } from 'fs'

import config from './config.mjs'
import { executed } from './util.mjs'


export async function buildZIP() {
  return new Promise((resolve, reject) => {
    const zip = archiver('zip', {
      zlib: { level: 9 }
    })

    const dest = config.dest + '.zip'
    const zipfile = createWriteStream(dest)

    zipfile.on('close', () => resolve(dest))
    zip.pipe(zipfile)

    const EXTS = ['.woff2', '.ttf']

    config.variations.forEach(variation => {
      EXTS.forEach(ext => {
        const file = `${variation.dest}${ext}`
        const filename = file.substring(config.destroot.length + 1)
    
        zip.file(file, { name: filename })
      })
    })
    
    zip.finalize()
  })
}


if (executed(import.meta)) {
  buildZIP()
}
