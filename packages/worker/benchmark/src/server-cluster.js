const cluster = require("cluster")
const { createServer } = require("http")
const { cpus } = require("os")
const { sum } = require("./myWorker")

if (cluster.isMaster) {
  for (let i = 0; i < cpus().length; i++) {
    cluster.fork()
  }
} else {
  createServer((req, res) => {
    if (req.url === "/") {
      res.end("Hello!")
    } else {
      const payload = Number(req.url.slice(1))
      const result = sum(payload)

      res.end(JSON.stringify(result))
    }
  }).listen(3000)
}
