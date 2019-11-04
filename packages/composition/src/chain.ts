import { ArityOneFn, Pipe, WrappingFn } from './internal/common-types'

type Chain = (wrappingFn: WrappingFn) => Pipe

const chain: Chain = (wrappingFn) => (...fns) => (initialArg) =>
  fns.reduce(
    (arg: any, fn: ArityOneFn, index: number) =>
      wrappingFn(fn, arg, index === fns.length - 1),
    initialArg,
  )

export { chain }
export default chain
