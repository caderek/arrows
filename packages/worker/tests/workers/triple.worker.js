const { worker } = require("../../lib")

const tripleHandler = (payload) => {
  return payload * 3
}

exports.triple = worker(tripleHandler)
exports.tripleHandler = tripleHandler
