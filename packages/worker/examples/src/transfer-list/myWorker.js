const { worker } = require("@arrows/worker")

/**
 * This payload is not cloned, the underlying memory is moved,
 * see caller code to check how it's done.
 *
 * @param {Uint8Array} payload
 * @returns {number}
 */
const handler = (payload) => {
  return payload.reduce((a, b) => a + b)
}

module.exports = worker(handler)
