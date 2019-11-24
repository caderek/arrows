const { worker } = require("../../lib")
const workerThreads = require("worker_threads")

workerThreads.isMainThread = false
workerThreads.parentPort = {
  on(eventName, callback) {},
}

const identityHandler = (payload) => payload

exports.identity = worker(identityHandler, { poolSize: 1 })
exports.identityHandler = identityHandler

workerThreads.isMainThread = true
workerThreads.parentPort = null
