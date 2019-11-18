import { isMainThread } from "worker_threads"
import spawn from "./spawn"
import work from "./work"
import { Worker, Task } from "./types"
import * as getCallerFile from "get-caller-file"

/**
 * Spawns workers and returns a function that handles messaging
 * and returns responses as promises.
 *
 * @param handler Function that performs calculations inside worker threads
 * @param config Configuration options
 * @returns Async function that communicates with worker threads.
 */
const worker: Worker = (handler, config = {}) => {
  const fileName = getCallerFile()

  return (isMainThread ? spawn(fileName, config) : work(handler)) as Task
}

export { worker }
export default worker
