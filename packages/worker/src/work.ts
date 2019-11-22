import {
  isMainThread,
  parentPort,
  workerData,
  MessagePort,
} from "worker_threads"
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
  if (isMainThread) {
    return
  }

  const port = parentPort as MessagePort

  port.on("message", async ([id, payload, method]) => {
    try {
      let response

      if (typeof handler === "function") {
        response = await handler(payload, workerData)
      } else if (method && handler[method]) {
        response = await handler[method](payload, workerData)
      } else {
        throw new Error("No such method")
      }

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
