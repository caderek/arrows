import { methodKey, multimethodKey } from './multimethod'

type Class<T> = new (...args: any[]) => T

export type Dispatch = (...args: any[]) => any

export type MethodEntry = [any, any]

export type MethodEntries = MethodEntry[]

export type DefaultMethod = ((arg0: any, arg1?: any) => any) | null

export type ValueCaseEntry = {
  type: 'value'
  value: any
}
export type ConstructorCaseEntry = {
  type: 'constructor'
  value: new (...args: any[]) => Class<any>
}
export type FunctionCaseEntry = {
  type: 'function'
  value: (...args: any[]) => boolean
}
export type MixedCaseEntry = {
  type: 'mixed'
  values: Array<ConstructorCaseEntry | ValueCaseEntry>
}
export type CaseEntry =
  | ValueCaseEntry
  | ConstructorCaseEntry
  | FunctionCaseEntry
  | MixedCaseEntry

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
