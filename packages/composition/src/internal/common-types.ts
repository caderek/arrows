export type AnyFn = (...args: any[]) => any

export type ReducingFn = (acc: any, next: any) => any

export type ReduceFn = (fn: ReducingFn, initial: any) => (arr: any[]) => any

export type WrappingFn = AnyFn

export type ChainFunctions = (...fns: AnyFn[]) => (initialArg: any) => any

export type ChainFactory = (
  reduceFn: ReduceFn,
  wrappingFn?: WrappingFn,
) => ChainFunctions
