const fs = require('fs')
const exec = require('child_process').exec

console.log(fs.readdirSync(process.cwd()))

const ALL = 'all'
const INSTALL = 'install'
let status = 0

const command = process.argv[2] || INSTALL
const scope = process.argv[3] || ALL

const executeCommand = (package) => {
  return new Promise((resolve) => {
    exec(
      `yarn --cwd ${process.cwd()}/packages/${package} ${command}`,
      (error, stdout, stderr) => {
        if (error) {
          status = 1
        }

        resolve({ package, error, stdout, stderr })
      },
    )
  })
}

const packages =
  scope === ALL ? fs.readdirSync(`${process.cwd()}/packages`) : [scope]

Promise.all(packages.map(executeCommand))
  .then((results) => {
    results.forEach(({ package, error, stdout, stderr }) => {
      console.log('--------------------------')
      console.log(`Package: ${package}`)
      console.log('--------------------------')

      if (error) {
        console.log('Script error:')
        console.log(error)
      }

      console.log('Output:')
      console.log(stdout)
      console.log(stderr)
    })
  })
  .then(() => {
    process.exit(status)
  })
