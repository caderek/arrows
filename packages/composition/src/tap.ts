import { AnyFn } from './internal/common-types'

type Tap = <T>(fn: AnyFn) => (arg: T) => T

const tap: Tap = (fn) => (arg) => {
  if (arg instanceof Promise) {
    arg.then((result) => fn(result))
  } else {
    fn(arg)
  }

  return arg
}

export { tap }
export default tap
