import { ChainFactory } from './types'

const chain: ChainFactory = (reducingFn, wrappingFn = null) => (...fns) => (
  initialArg,
) => {
  return wrappingFn
    ? reducingFn((arg: any, fn: Function) => wrappingFn(fn)(arg), initialArg)(
        fns,
      )
    : reducingFn((arg: any, fn: Function) => fn(arg), initialArg)(fns)
}

export default chain
