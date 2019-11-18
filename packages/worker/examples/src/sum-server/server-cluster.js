const express = require("express")
const cluster = require("cluster")
const numCPUs = require("os").cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
} else {
  express()
    .get("/sum/:end", async (req, res) => {
      const payload = Number(req.params.end)
      const sum = Array.from({ length: payload }, (_, i) => i).reduce(
        (a, b) => a + b,
      )

      res.send({ sum })
    })
    .listen(3000)
}
