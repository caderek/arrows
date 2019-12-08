import {
  isMainThread,
  parentPort,
  workerData,
  MessagePort,
} from "worker_threads"
import { Work, transferKey, TransferResult, WorkerDefinition } from "./types"
import * as getCallerFile from "get-caller-file"

/**
 * Defines a worker that can be later used with `spawn` function.
 *
 * Use when you want to separate worker definition from spawning a thread pool.
 *
 * @param handler Function that performs calculations inside worker threads
 * @returns Nothing, just defines a worker for use with `spawn` function
 */
const work: Work = (handler) => {
  return {
    fileName: getCallerFile(),
    handler,
  }
  // if (isMainThread) {
  //   return {
  //     fileName: getCallerFile(),
  //     handler,
  //   }
  // }

  // const port = parentPort as MessagePort

  // port.on("message", async ([id, payload, method]) => {
  //   try {
  //     let response: TransferResult<any> | any

  //     if (typeof handler === "function") {
  //       response = await handler(payload, workerData)
  //     } else if (method && handler[method]) {
  //       response = await handler[method](payload, workerData)
  //     } else {
  //       throw new Error(`The worker does not have "${method}" method.`)
  //     }

  //     let result
  //     let transferList

  //     if (response && response[transferKey]) {
  //       result = response.result
  //       transferList = response[transferKey]
  //     } else {
  //       result = response
  //     }

  //     port.postMessage([id, result], transferList)
  //   } catch (error) {
  //     port.postMessage([id, undefined, error])
  //   }
  // })

  // return (undefined as unknown) as WorkerDefinition<any, any, any>
}

export { work }
export default work
