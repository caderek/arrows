type Size_ = <T>(arr: T[]) => number

/**
 * Retrieves the size (length) of the array.
 *
 * @param arr Initial array
 * @returns Array size (length)
 */
const size_: Size_ = (arr) => arr.length

export { size_ }
export default size_
