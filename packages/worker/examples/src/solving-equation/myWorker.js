const { worker } = require("@arrows/worker")

/**
 * Another example - complex mathematical operations.
 *
 * @param {number} iterations
 * @returns {number} PI approximation
 */
const calculatePI = (iterations) => {
  let pi = 0
  for (let i = 0; i < iterations; i++) {
    let temp = 4 / (i * 2 + 1)
    pi += i % 2 === 0 ? temp : -temp
  }
  return pi
}

/**
 * Note that in some cases you may want to decrease
 * the number of workers in the pool.
 * For example, if a system runs many application, full CPU load
 * can be less performant (cost of switching between applications).
 */
module.exports = worker(calculatePI, { poolSize: 2 })
