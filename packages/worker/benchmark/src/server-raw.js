const { createServer } = require("http")
const { sum } = require("./myWorker")

createServer((req, res) => {
  if (req.url === "/") {
    res.end("Hello!")
  } else {
    const payload = Number(req.url.slice(1))
    const result = sum(payload)

    res.end(JSON.stringify(result))
  }
}).listen(3000)
