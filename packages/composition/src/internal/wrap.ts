type Wrap = <T, R>(fn: (arg: T) => R, input: T) => R | Error | T

const wrap: Wrap = (fn, input) => {
  if (input instanceof Error) {
    return input
  }

  let result

  try {
    result = fn(input)
  } catch (error) {
    result = error
  }

  return typeof result === 'undefined' ? input : result
}

export { wrap }
export default wrap
