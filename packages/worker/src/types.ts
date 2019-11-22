import { WorkerOptions, MessagePort } from "worker_threads"

export const transferKey = Symbol("transfer")

type Config<T2, R> = Partial<
  WorkerOptions & {
    poolSize: number
    workerData: T2
    transfer: (result: R) => Array<ArrayBuffer | MessagePort>
  }
>

type ExitCode = number

type TransferResult<R> = {
  result: R
  [transferKey]: Array<ArrayBuffer | MessagePort>
}

export type HandlerFn<T1, T2, R> = (payload?: T1, workerData?: T2) => R

export type Handler<T1, T2, R> =
  | HandlerFn<T1, T2, R>
  | {
      [method: string]: HandlerFn<T1, T2, R>
    }

export type Work = (handler: Handler<any, any, any>) => void

export type Task<T1, R> = {
  (payload: T1, transferList?: (ArrayBuffer | MessagePort)[]): Promise<R>
  ref: () => void
  unref: () => void
  terminate: () => Promise<ExitCode[]>
}

export type Spawn = (
  fileName: string,
  config?: Config<any, any>,
) => Task<any, any>

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

export type WrappedHandler<T1, T2, R> =
  | WrappedHandlerFn<T1, T2, R>
  | WrappedHandlerObj<T1, T2, R>

export type Transfer = <T1, T2, R>(
  handler: Handler<T1, T2, R>,
  mapperFn: (result: R) => Array<ArrayBuffer | MessagePort>,
) => WrappedHandler<T1, T2, R>
