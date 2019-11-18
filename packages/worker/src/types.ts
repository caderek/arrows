import { WorkerOptions } from "worker_threads"

type Config<T2> = Partial<
  WorkerOptions & {
    poolSize: number
    workerData: T2
  }
>

type ExitCode = number

export type Handler<T1, T2, R> = (payload: T1, workerData: T2) => R

export type Work = (handler: Handler<any, any, any>) => void

export type Task<T1, R> = {
  (payload: T1): Promise<R>
  ref: () => void
  unref: () => void
  terminate: () => Promise<ExitCode[]>
}

export type Spawn = (fileName: string, config?: Config<any>) => Task<any, any>

export type Worker = <T1, T2, R>(
  handler: Handler<T1, T2, R>,
  config?: Config<T2>,
) => Task<T1, R>
