const { worker } = require("@arrows/worker")

/**
 * Perform some operations on shared data.
 *
 * In this example we will add 10 to each element of the shared array
 * within the provided range.
 *
 * @param {Object} payload
 * @param {Uint8Array} payload.sharedData
 * @param {number} from
 * @param {number} to
 */
const handler = ({ sharedData, from, to }) => {
  for (let i = from; i < to; i++) {
    Atomics.add(sharedData, i, 10)
  }
}

module.exports = worker(handler)
