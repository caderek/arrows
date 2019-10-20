import { AnyFn, Pipe, WrappingFn } from './internal/common-types'

type Chain = (wrappingFn: WrappingFn) => Pipe

const chain: Chain = (wrappingFn) => (...fns) => (initialArg) =>
  fns.reduce((arg: any, fn: AnyFn) => wrappingFn(fn, arg), initialArg)

export { chain }
export default chain
