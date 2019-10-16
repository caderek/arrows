const curry = (fn: (...x: any[]) => any, args: any[] = []) => {
  if (fn.length < 2) {
    return fn
  }

  return (...newArgs: any[]) =>
    ((rest) => (rest.length >= fn.length ? fn(...rest) : curry(fn, rest)))([
      ...args,
      ...newArgs,
    ])
}

export { curry }
export default curry
