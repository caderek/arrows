const { worker } = require("../../lib/index")

const handler = (data) => data

module.exports = worker(handler, { poolSize: 1 })
