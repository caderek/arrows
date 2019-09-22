export type ChainFunctions = (...fns: Function[]) => (initialArg: any) => any

export type ChainFactory = (
  reduceFn: Function,
  wrappingFn?: Function,
) => ChainFunctions
