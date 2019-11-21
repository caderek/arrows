const { createServer } = require("http")
const { spawn } = require("../../lib")

const sumWorker = spawn("./benchmark/src/myWorker.js")

createServer(async (req, res) => {
  if (req.url === "/") {
    res.end("Hello!")
  } else {
    const payload = Number(req.url.slice(1))
    const result = await sumWorker(payload)

    res.end(JSON.stringify(result))
  }
}).listen(3000)
