const wrap = <T, R>(fn: (arg: T) => R, input: T) => {
  if (input instanceof Error) {
    return input
  }

  let result: Exclude<R, void>

  try {
    result = fn(input) as Exclude<R, void>
  } catch (error) {
    result = error
  }

  if (result === undefined) {
    return input as T
  }

  return result as Exclude<R, void>
}

export { wrap }
export default wrap
