const { work } = require("../../lib")

const sum = (payload) => {
  return Array.from({ length: payload }, (_, i) => i).reduce((a, b) => a + b)
}

work(sum)

exports.sum = sum
