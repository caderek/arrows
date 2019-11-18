const express = require("express")
const myWorker = require("./myWorker")

express()
  .get("/sum/:end", async (req, res) => {
    const payload = Number(req.params.end)
    const sum = await myWorker(payload)

    res.send({ sum })
  })
  .listen(3000)
