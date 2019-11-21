const { worker, transfer } = require("@arrows/worker")

/**
 * This payload is not cloned, the underlying memory is moved,
 * see caller code to check how it's done.
 *
 * Also, the return value is not cloned either (see `transfer` function below).
 *
 * @param {Uint8Array} payload
 * @returns {Uint8Array}
 */
const handler = (payload) => {
  return payload.map((x) => x * 2)
}

/**
 *
 */
const wrappedHandler = transfer(handler, (result) => [result.buffer])

module.exports = worker(wrappedHandler)
