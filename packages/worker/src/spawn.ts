import { Worker, MessagePort } from "worker_threads"
import { cpus } from "os"
import { Spawn, Task } from "./types"

const defaultConfig = {
  poolSize: cpus().length,
}

type CreateTask<T> = (
  promises: Map<
    bigint,
    { resolve: (value?: unknown) => void; reject: (reason?: any) => void }
  >,
  workers: Worker[],
  currentWorker: { index: number },
  poolSize: number,
) => (payload: T, transferList?: (ArrayBuffer | MessagePort)[]) => Promise<any>

const createTask: CreateTask<any> = (
  promises,
  workers,
  currentWorker,
  poolSize,
) => (payload, transferList) => {
  const id = process.hrtime.bigint()

  const promise = new Promise((resolve, reject) => {
    promises.set(id, { resolve, reject })
  })

  workers[currentWorker.index].postMessage([id, payload], transferList)
  currentWorker.index = (currentWorker.index + 1) % poolSize

  return promise
}

/**
 * Spawns a workers pool from worker defined in a separate file,
 * returns a function that handles messaging and returns responses as promises.
 *
 * Use when you want to separate worker definition from spawning a thread pool.
 *
 * @param workerDefinition Path to a worker definition file created with `work` function or worker definition
 * @param config Configuration options
 * @returns Async function that communicates with worker threads
 */
const spawn: Spawn = (workerDefinition, config = {}) => {
  const cfg = { ...defaultConfig, ...config }
  const { poolSize, transfer, ...options } = cfg

  const fileName =
    typeof workerDefinition === "string"
      ? workerDefinition
      : workerDefinition.fileName

  const handler =
    typeof workerDefinition === "string" ? null : workerDefinition.handler

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

  const currentWorker = { index: 0 }

  const baseTask = createTask(promises, workers, currentWorker, poolSize)

  const task: Task<any, any> = Object.assign(baseTask, {
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
