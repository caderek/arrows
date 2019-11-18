const { Worker, isMainThread, parentPort } = require("worker_threads")

if (isMainThread) {
  module.exports = (payload) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename)
        .once("message", resolve)
        .once("error", reject)

      worker.postMessage(payload)
    })
  }
} else {
  parentPort.once("message", (payload) => {
    // Do some CPU-intensive calculations.
    // For now we will keep it simple:
    const result = payload * 2
    parentPort.postMessage(result)
  })
}
