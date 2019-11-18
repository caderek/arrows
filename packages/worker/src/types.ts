import { WorkerOptions } from "worker_threads"

type Config = Partial<
  WorkerOptions & {
    poolSize: number
  }
>

export type Handler = (payload: any, workerData: any) => any

export type Work = (handler: Handler) => void

export type Task = {
  (payload: any): Promise<any>
  ref: () => void
  unref: () => void
  terminate: () => Promise<number[]>
}

export type Spawn = (fileName: string, config?: Config) => Task

export type Worker = (handler: Handler, config?: Config) => Task
