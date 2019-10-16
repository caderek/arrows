import { AnyFn } from './common-types'
import wrapSync from './wrapSync'

const wrap = (fn: AnyFn) => (input: any) => {
  if (input instanceof Promise) {
    return input.then((rawInput) => {
      return wrapSync(fn)(rawInput)
    })
  }

  return wrapSync(fn)(input)
}

export { wrap }
export default wrap
