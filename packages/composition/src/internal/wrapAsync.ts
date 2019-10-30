import { ArityOneFn } from './common-types'
import wrap from './wrap'

const wrapAsync = (fn: ArityOneFn, input: any, isLast: boolean) => {
  if (input instanceof Promise) {
    return input.then((rawInput) => {
      return wrap(fn, rawInput)
    })
  }

  return isLast ? Promise.resolve(wrap(fn, input)) : wrap(fn, input)
}

export { wrapAsync }
export default wrapAsync
