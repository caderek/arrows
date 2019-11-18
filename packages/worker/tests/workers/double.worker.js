const { worker } = require("../../lib")

exports.double = worker((payload) => payload * 2, { poolSize: 1 })
