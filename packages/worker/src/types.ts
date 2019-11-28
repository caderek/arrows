import { WorkerOptions, MessagePort } from "worker_threads"

export const transferKey = Symbol("transfer")

export type Config<T2, R> = Partial<
  WorkerOptions & {
    poolSize: number
    workerData: T2
    transfer: (result: R) => Array<ArrayBuffer | MessagePort>
  }
>

type ExitCode = number

export type TransferResult<R> = {
  result: R
  [transferKey]: Array<ArrayBuffer | MessagePort>
}

export type HandlerFn<T1, T2, R> = (payload: T1, workerData?: T2) => R

export type Handler<T1, T2, R> =
  | HandlerFn<T1, T2, R>
  | {
      [method: string]: HandlerFn<T1, T2, R>
    }

export type WorkerDefinition<T1, T2, R> = {
  fileName: string
  handler: Handler<T1, T2, R>
}

export type Work = <T1, T2, R>(
  handler: Handler<T1, T2, R>,
) => WorkerDefinition<T1, T2, R>

export type Task<T1, R> = {
  (payload: T1, transferList?: (ArrayBuffer | MessagePort)[]): Promise<R>
  ref: () => void
  unref: () => void
  terminate: () => Promise<ExitCode[]>
}

export type Spawn = <T1, T2, R>(
  workerDefinition: string | WorkerDefinition<T1, T2, R>,
  config?: Config<T2, R>,
) => Task<T1, R>

export type Worker = <T1, T2, R>(
  handler: Handler<T1, T2, R>,
  config?: Config<T2, R>,
) => Task<T1, R>

export type WrappedHandlerFn<T1, T2, R> = (
  payload: T1,
  workerData?: T2,
) => TransferResult<R>

export type WrappedHandlerObj<T1, T2, R> = {
  [method: string]: WrappedHandlerFn<T1, T2, R>
}

export type Transfer = <T1, T2, R>(
  handler: HandlerFn<T1, T2, R>,
  mapperFn: (result: R) => Array<ArrayBuffer | MessagePort>,
) => WrappedHandlerFn<T1, T2, R>
