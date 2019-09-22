import { multimethodKey } from './multimethod'

export type Dispatch = (...args: any[]) => any

export type MethodEntry = [any, any]

export type MethodEntries = MethodEntry[]

export type DefaultMethod = (arg0: any, arg1?: any) => any

export type Internals = {
  methodEntries: MethodEntries
  defaultMethod: DefaultMethod
  dispatch: Dispatch
}

export type Multimethod = {
  (...args: any[]): any
  [multimethodKey]: Internals
}

export type Method = (
  arg0: any,
  arg1?: any,
) => (multimethod: Multimethod) => Multimethod

export type Multi = (
  arg0?: Dispatch | Method,
  ...methods: Method[]
) => Multimethod
