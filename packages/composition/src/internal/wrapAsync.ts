import { ArityOneFn } from './common-types'
import wrap from './wrap'

const wrapAsync = (fn: ArityOneFn, input: any) => {
  if (input instanceof Promise) {
    return input.then((rawInput) => {
      return wrap(fn, rawInput)
    })
  }

  return wrap(fn, input)
}

export { wrapAsync }
export default wrapAsync
