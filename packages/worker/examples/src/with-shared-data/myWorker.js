const { worker } = require("@arrows/worker")

const handler = (payload, workerData) => {
  return {
    original: payload,
    calculated: payload + workerData,
    shared: workerData,
  }
}

module.exports = worker(handler, { poolSize: 1, workerData: 7 })
