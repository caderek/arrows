import { ArityOneFn } from './internal/common-types'
import { Compose20 } from './compose.types'

const compose: Compose20 = (...fns: ArityOneFn[]) => (initialArg: any) =>
  fns.reduceRight((arg: any, fn: ArityOneFn) => fn(arg), initialArg)

export { compose }
export default compose
