import { AnyFn, Compose, WrappingFn } from './internal/common-types'

type ChainRight = (wrappingFn: WrappingFn) => Compose

const chainRight: ChainRight = (wrappingFn) => (...fns) => (initialArg) =>
  fns.reduceRight((arg: any, fn: AnyFn) => wrappingFn(fn, arg), initialArg)

export { chainRight }
export default chainRight
