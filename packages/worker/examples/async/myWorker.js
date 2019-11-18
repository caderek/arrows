const worker = require("@arrows/worker").default

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Demonstrates that library manages promises correctly
 * - each call will return promises with correct corresponding result,
 * no matter that order of events can vary.
 */
const handler = async (data) => {
  await delay(Math.floor(Math.random() * 1000))
  return data
}

module.exports = worker(handler, { poolSize: 1 })
