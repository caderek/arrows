const { spawn } = require("@arrows/worker")

const fileName = `${module.parent.path}/myWorkerDefinition.js`

module.exports = spawn(fileName, { poolSize: 2 })
