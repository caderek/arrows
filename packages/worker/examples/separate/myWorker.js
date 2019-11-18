const { spawn } = require("../../lib/index")

const fileName = `${module.parent.path}/myWorkerDefinition.js`

module.exports = spawn(fileName, { poolSize: 2 })
