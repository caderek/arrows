import { AnyFn, Pipe } from './internal/common-types'

const pipe: Pipe = (...fns) => (initialArg) =>
  fns.reduce((arg: any, fn: AnyFn) => fn(arg), initialArg)

export { pipe }
export default pipe
