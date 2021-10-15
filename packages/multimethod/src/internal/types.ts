import { methodKey, multimethodKey } from './multimethod'

type Class<T> = new (...args: any[]) => T

export type Dispatch = (...args: any[]) => any

export type MethodEntry = [any, any]

export type MethodEntries = MethodEntry[]

export type DefaultMethod = ((arg0: any, arg1?: any) => any) | null

export type WildcardCaseEntry = {
  type: 'wildcard'
}

export type DataCaseEntry = {
  type: 'data'
  value: any
}

export type ConstructorCaseEntry = {
  type: 'constructor'
  value: new (...args: any[]) => Class<any>
}

export type RegExpCaseEntry = {
  type: 'regexp'
  value: RegExp
}

export type PredicateCaseEntry = {
  type: 'predicate'
  value: (...args: any[]) => boolean
}

export type MixedCaseTypes =
  | ConstructorCaseEntry
  | DataCaseEntry
  | RegExpCaseEntry
  | WildcardCaseEntry
  | PredicateCaseEntry

export type MixedCaseEntry = {
  type: 'mixed'
  values: Array<MixedCaseTypes>
}

export type CaseEntry =
  | DataCaseEntry
  | ConstructorCaseEntry
  | RegExpCaseEntry
  | PredicateCaseEntry
  | MixedCaseEntry
  | WildcardCaseEntry

export type Internals = {
  methodEntries: MethodEntries
  defaultMethod: DefaultMethod
  dispatch: Dispatch
}

export type Multi = {
  [multimethodKey]: Internals
}

export type Multimethod = ((...args: any[]) => any) & Multi

export type MethodFn = (
  arg0: any,
  arg1?: any,
) => (multimethod: Multimethod) => Multimethod

export type MultiFn = (
  arg0?: Dispatch | MethodFn,
  ...methods: MethodFn[]
) => Multimethod
