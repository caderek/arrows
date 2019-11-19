import { Worker, MessagePort } from "worker_threads"
import { cpus } from "os"
import { Spawn, Task } from "./types"

const defaultConfig = {
  poolSize: cpus().length,
}

/**
 * Spawns a workers pool from worker defined in a separate file,
 * returns a function that handles messaging and returns responses as promises.
 *
 * Use when you want to separate worker definition from spawning a thread pool.
 *
 * @param fileName Path to a worker definition file created with `work` function
 * @param config Configuration options
 * @returns Async function that communicates with worker threads
 */
const spawn: Spawn = (fileName, config = {}) => {
  const cfg = { ...defaultConfig, ...config }
  const { poolSize, ...options } = cfg

  if (poolSize <= 0) {
    throw new Error("Pool size has to be > 0")
  }

  const promises = new Map()

  const workers = Array.from({ length: poolSize }, () =>
    new Worker(fileName, options).on("message", ([id, data, error]) => {
      if (error) {
        promises.get(id).reject(error)
      } else {
        promises.get(id).resolve(data)
      }
      promises.delete(id)
    }),
  )

  let workerIndex = 0

  const fn = (payload: any, transferList?: (ArrayBuffer | MessagePort)[]) => {
    const id = process.hrtime.bigint()

    const promise = new Promise((resolve, reject) => {
      promises.set(id, { resolve, reject })
    })

    workers[workerIndex].postMessage([id, payload], transferList)
    workerIndex = (workerIndex + 1) % poolSize

    return promise
  }

  const task: Task<any, any> = Object.assign(fn, {
    ref() {
      workers.forEach((worker) => worker.ref())
    },
    unref() {
      workers.forEach((worker) => worker.unref())
    },
    terminate() {
      return Promise.all(workers.map((worker) => worker.terminate()))
    },
  })

  return task
}

export { spawn }
export default spawn
