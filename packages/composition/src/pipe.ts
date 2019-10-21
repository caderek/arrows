import { ArityOneFn, Pipe } from './internal/common-types'

const pipe: Pipe = (...fns) => (initialArg) =>
  fns.reduce((arg: any, fn: ArityOneFn) => fn(arg), initialArg)

export { pipe }
export default pipe
