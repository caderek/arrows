import { ArityOneFn, Compose, WrappingFn } from './internal/common-types'

type ChainRight = (wrappingFn: WrappingFn) => Compose

const chainRight: ChainRight = (wrappingFn) => (...fns) => (initialArg) =>
  fns.reduceRight(
    (arg: any, fn: ArityOneFn, index: number) =>
      wrappingFn(fn, arg, index === fns.length - 1),
    initialArg,
  )

export { chainRight }
export default chainRight
