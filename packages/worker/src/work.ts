import { parentPort, workerData } from "worker_threads"
import { Work } from "./types"

/**
 * Defines a worker that can be later used with `spawn` function.
 *
 * Use when you want to separate worker definition from spawning a thread pool.
 *
 * @param handler Function that performs calculations inside worker threads
 * @returns Nothing, just defines a worker for use with `spawn` function
 */
const work: Work = (handler) => {
  if (parentPort === null) {
    throw new Error("This code should only run in worker thread.")
  }

  parentPort.on("message", async ([id, payload]) => {
    try {
      const result = await handler(payload, workerData)
      parentPort?.postMessage([id, result])
    } catch (error) {
      parentPort?.postMessage([id, payload, error])
    }
  })
}

export { work }
export default work
