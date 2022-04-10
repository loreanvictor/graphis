const archiver = require('archiver')
const { createWriteStream } = require('fs')

const config = require('./config')


const zip = archiver('zip', {
  zlib: { level: 9 }
})

const zipfile = createWriteStream(config.dest + '.zip')
zipfile.on('close', () => {
  console.log(`${config.name} zip archive created`)
})

zip.pipe(zipfile)

EXTS = ['.woff2', '.ttf']

config.variations.forEach(variation => {
  EXTS.forEach(ext => {
    const file = `${variation.dest}${ext}`
    const filename = file.substring(config.destroot.length + 1)

    zip.file(file, { name: filename })
  })
})

zip.finalize()
