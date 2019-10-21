import { ArityOneFn, Pipe, WrappingFn } from './internal/common-types'

type Chain = (wrappingFn: WrappingFn) => Pipe

const chainRight: Chain = (wrappingFn) => (...fns) => (initialArg) =>
  fns.reduce((arg: any, fn: ArityOneFn) => wrappingFn(fn, arg), initialArg)

export { chainRight as chain }
export default chainRight
