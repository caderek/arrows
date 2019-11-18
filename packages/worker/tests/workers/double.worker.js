const { worker } = require("../../lib")

const doubleHandler = (payload) => payload * 2

exports.double = worker(doubleHandler, { poolSize: 1 })
exports.doubleHandler = doubleHandler
