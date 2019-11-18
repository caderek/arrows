const express = require("express")

express()
  .get("/sum/:end", async (req, res) => {
    const payload = Number(req.params.end)
    const sum = Array.from({ length: payload }, (_, i) => i).reduce(
      (a, b) => a + b,
    )

    res.send({ sum })
  })
  .listen(3000)
