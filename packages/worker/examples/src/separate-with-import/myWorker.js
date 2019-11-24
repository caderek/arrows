const { spawn } = require("../../../lib")
const myWorkerDefinition = require("./myWorkerDefinition")

// const a = spawn(myWorkerDefinition, { poolSize: 2 })

// const b = a(123)

module.exports = spawn(myWorkerDefinition, { poolSize: 2 })
