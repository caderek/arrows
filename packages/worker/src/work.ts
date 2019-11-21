import { parentPort, workerData, MessagePort } from "worker_threads"
import { Work, transferKey } from "./types"

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
    throw new Error("This code should not run in the main thread.")
  }

  const port = parentPort as MessagePort

  port.on("message", async ([id, payload]) => {
    try {
      const response = await handler(payload, workerData)

      let result
      let transferList

      if (response && response[transferKey]) {
        result = response.result
        transferList = response[transferKey]
      } else {
        result = response
      }

      port.postMessage([id, result], transferList)
    } catch (error) {
      port.postMessage([id, payload, error])
    }
  })
}

export { work }
export default work
