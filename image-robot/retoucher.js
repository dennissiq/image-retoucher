const gm = require('gm').subClass({ imageMagick: true })
const path = require('path')
const rootPath = path.resolve(__dirname, '..')

const fromRoot = relPath => path.resolve(rootPath, relPath)

async function retoucher() {
  await convertImage()
}

async function convertImage() {
  return new Promise((resolve, reject) => {
    const inputFile = fromRoot(`./image-robot/content/img.jpg[0]`)
    const outputFile = fromRoot(`./image-robot/output/img-converted.png`)
    const width = 1920
    const height = 1080

    gm()
      .in(inputFile)
      .out('(')
      .out('-clone')
      .out('0')
      .out('-background', 'white')
      .out('-blur', '0x9')
      .out('-resize', `${width}x${height}^`)
      .out(')')
      .out('(')
      .out('-clone')
      .out('0')
      .out('-background', 'white')
      .out('-resize', `${width}x${height}`)
      .out(')')
      .out('-delete', '0')
      .out('-gravity', 'center')
      .out('-compose', 'over')
      .out('-composite')
      .out('-extent', `${width}x${height}`)
      .write(outputFile, error => {
        if (error) {
          return reject(error)
        }

        console.log(
          `🎉 [IMAGE-RETOUCHER] Imagem criada com sucesso: ${outputFile} \n\n \t\t\t\t\t\t\t\t<🐥> BirdNest Technologies\n\n\n\n`
        )
        resolve()
      })
  })
}

module.exports = retoucher
