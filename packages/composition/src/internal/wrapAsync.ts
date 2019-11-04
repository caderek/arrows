import wrap from './wrap'

type WrapAsync = <T, R>(
  fn: (arg: T) => R,
  input: T,
  isLast: boolean,
) => R | Error | T | Promise<T | R | Error>

const wrapAsync: WrapAsync = (fn, input, isLast) => {
  if (input instanceof Promise) {
    return input.then((rawInput) => {
      return wrap(fn, rawInput)
    })
  }

  return isLast ? Promise.resolve(wrap(fn, input)) : wrap(fn, input)
}

export { wrapAsync }
export default wrapAsync
