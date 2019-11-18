const { worker } = require("@arrows/worker")

const handler = (data) => data

module.exports = worker(handler, { poolSize: 1 })
