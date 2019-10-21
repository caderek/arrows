export type ArityOneFn = (arg: any) => any

export type ReducingFn = (acc: any, next: any) => any

export type ReduceFn = (fn: ReducingFn, initial: any) => (arr: any[]) => any

export type WrappingFn = (fn: ArityOneFn, arg: any) => any

export type Pipe = (...fns: ArityOneFn[]) => (initialArg: any) => any

export type Compose = Pipe
