const fs = require('fs-extra')
const { exec } = require('child_process')

const execAsync = (command) => {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      resolve({ error, stdout, stderr })
    })
  })
}

const ALL = 'all'
const INSTALL = 'install'
let status = 0

const command = process.argv[2] || INSTALL
const scope = process.argv[3] || ALL

const executeStandardCommand = async (package) => {
  const result = await execAsync(`yarn --cwd packages/${package} ${command}`)

  console.log('--------------------------')
  console.log(`Package: ${package}`)
  console.log('--------------------------')

  console.log(result.error)
  console.log(result.stdout)
  console.log(result.stderr)
}

const executePublishCommand = async (package) => {
  let prepResult
  let publishResult

  fs.removeSync(`packages/${package}/lib`)

  const buildResult = await execAsync(`yarn --cwd packages/${package} build`)

  if (buildResult.error === null) {
    prepResult = await execAsync(`yarn --cwd packages/${package} prep`)
  }

  if (prepResult && prepResult.error === null) {
    publishResult = await execAsync(
      `yarn --cwd packages/${package}/lib publish`,
    )
  }

  console.log('--------------------------')
  console.log(`Package: ${package}`)
  console.log('--------------------------')

  console.log(buildResult.error)
  console.log(buildResult.stdout)
  console.log(buildResult.stderr)

  if (prepResult) {
    console.log(prepResult.error)
    console.log(prepResult.stdout)
    console.log(prepResult.stderr)
  }

  if (publishResult) {
    console.log(publishResult.error)
    console.log(publishResult.stdout)
    console.log(publishResult.stderr)
  }
}

const executeCommand = (package) =>
  command === 'publish'
    ? executePublishCommand(package)
    : executeStandardCommand(package)

const packages = scope === ALL ? fs.readdirSync('packages') : [scope]

packages.forEach(executeCommand)
