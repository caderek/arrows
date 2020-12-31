type Range_ = (from: number, to: number, step?: number) => number[]

/**
 * Creates an array of numbers in a provided range - ascending or descending.
 *
 * @param from Starting number (included)
 * @param to Ending number (excluded)
 * @param step Step (must be greater than zero)
 * @returns Range array
 */
const range_: Range_ = (from, to, step = 1) => {
  if (from === to) {
    return []
  }

  if (step <= 0) {
    throw new Error("Step must be greater than zero.")
  }

  const arr = new Array(Math.floor(Math.abs(to - from) / step))

  let i = from
  let j = 0

  if (from > to) {
    while (i > to) {
      arr[j] = i
      i -= step
      j++
    }
  } else {
    while (i < to) {
      arr[j] = i
      i += step
      j++
    }
  }

  return arr
}

export { range_ }
export default range_
