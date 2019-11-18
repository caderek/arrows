const { worker } = require("@arrows/worker")

/**
 * Let's create our handler for some CPU-intensive task.
 * Returned value will be passed as a promise to our caller
 * (we don't have to if it's a fire-and-forget task).
 *
 * For example, let's calculate sum of integers from 0 to provided value:
 */
const handler = (payload) => {
  return Array.from({ length: payload }, (_, i) => i).reduce((a, b) => a + b)
}

/**
 * We can now execute worker function that will set up worker for us,
 *
 * We can pass custom configuration as a second argument,
 * but in this case we will use the default one (one worker per CPU).
 */
module.exports = worker(handler)
