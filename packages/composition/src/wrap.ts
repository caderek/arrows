import wrapSync from './wrapSync'

const wrap = (fn) => (input) => {
  if (input instanceof Promise) {
    return input.then((rawInput) => {
      return wrapSync(fn)(rawInput)
    })
  }

  return wrapSync(fn)(input)
}

export { wrap }
export default wrap
