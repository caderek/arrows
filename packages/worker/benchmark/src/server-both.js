const cluster = require("cluster")
const { createServer } = require("http")
const { cpus } = require("os")
const { spawn } = require("../../lib")

cpusCount = cpus().length

const poolSize = 6 //Math.floor(cpusCount / 2)
const clusterSize = cpusCount - poolSize

const sumWorker = spawn("./benchmark/src/myWorker.js", { poolSize })

if (cluster.isMaster) {
  for (let i = 0; i < clusterSize; i++) {
    cluster.fork()
  }
} else {
  createServer(async (req, res) => {
    if (req.url === "/") {
      res.end("Hello!")
    } else {
      const payload = Number(req.url.slice(1))
      const result = await sumWorker(payload)

      res.end(JSON.stringify(result))
    }
  }).listen(3000)
}
