import { AnyFn, ChainFactory } from './internal/common-types'

const chain: ChainFactory = (reduceFn, wrappingFn) => (...fns) => (
  initialArg,
) => {
  return wrappingFn
    ? reduceFn((arg: any, fn: AnyFn) => wrappingFn(fn)(arg), initialArg)(fns)
    : reduceFn((arg: any, fn: AnyFn) => fn(arg), initialArg)(fns)
}

export { chain }
export default chain
