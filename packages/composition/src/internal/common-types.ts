export type AnyFn = (...args: any[]) => any

export type ReducingFn = (acc: any, next: any) => any

export type ReduceFn = (fn: ReducingFn, initial: any) => (arr: any[]) => any

export type WrappingFn = AnyFn

export type Pipe = (...fns: AnyFn[]) => (initialArg: any) => any

export type Compose = Pipe
