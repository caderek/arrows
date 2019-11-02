import { ArityOneFn } from './internal/common-types'
import { Pipe20 } from './pipe.types'

const pipe: Pipe20 = (...fns: ArityOneFn[]) => (initialArg: any) =>
  fns.reduce((arg: any, fn: ArityOneFn) => fn(arg), initialArg)

export { pipe }
export default pipe
