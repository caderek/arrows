import { ChainFactory } from './internal/types'

const chain: ChainFactory = (reducingFn, wrappingFn = null) => (...fns) => (
  initialArg,
) => {
  return wrappingFn
    ? reducingFn((arg: any, fn: Function) => wrappingFn(fn)(arg), initialArg)(
        fns,
      )
    : reducingFn((arg: any, fn: Function) => fn(arg), initialArg)(fns)
}

export { chain }
export default chain
