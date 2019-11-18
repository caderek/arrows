const { worker } = require("../../lib/index")

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const handler = async (data) => {
  await delay(Math.floor(Math.random() * 1000))
  return data * 2
}

module.exports = worker(handler, { poolSize: 1 })
