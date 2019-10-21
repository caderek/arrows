import { ArityOneFn, Compose } from './internal/common-types'

const compose: Compose = (...fns) => (initialArg) =>
  fns.reduceRight((arg: any, fn: ArityOneFn) => fn(arg), initialArg)

export { compose }
export default compose
