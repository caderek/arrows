import { Worker } from "worker_threads"
import { cpus } from "os"
import { Spawn } from "./types"

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

  if (poolSize < 0) {
    throw new Error("Pool size has to be >= 0")
  }

  if (poolSize === 0) {
    return (payload) => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(fileName, options).on(
          "message",
          ([_, data, error]) => {
            if (error) {
              reject(error)
            } else {
              resolve(data)
            }
            worker.unref()
          },
        )

        worker.postMessage([undefined, payload])
      })
    }
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

  return (payload) => {
    const id = process.hrtime.bigint()

    const promise = new Promise((resolve, reject) => {
      promises.set(id, { resolve, reject })
    })

    workers[workerIndex].postMessage([id, payload])
    workerIndex = (workerIndex + 1) % poolSize

    return promise
  }
}

export { spawn }
export default spawn
