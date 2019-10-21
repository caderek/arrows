import { ArityOneFn, Compose, WrappingFn } from './internal/common-types'

type ChainRight = (wrappingFn: WrappingFn) => Compose

const chainRight: ChainRight = (wrappingFn) => (...fns) => (initialArg) =>
  fns.reduceRight((arg: any, fn: ArityOneFn) => wrappingFn(fn, arg), initialArg)

export { chainRight }
export default chainRight
