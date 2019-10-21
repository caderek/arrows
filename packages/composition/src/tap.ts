import curry from './curry'
import { ArityOneFn } from './internal/common-types'

type RawTap = <T>(fn: ArityOneFn, arg: T) => T

const rawTap: RawTap = (fn, arg) => {
  if (arg instanceof Promise) {
    arg.then((result) => fn(result))
  } else {
    fn(arg)
  }

  return arg
}

type Tap = RawTap & (<T>(fn: ArityOneFn) => (arg: T) => T)
const tap = curry(rawTap)

export { tap }
export default tap
