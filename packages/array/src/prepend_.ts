import curry from "@arrows/composition/curry"

type _Prepend_ = <T>(value: T, arr: T[]) => T[]
type _Prepend2_ = <T>(value: T) => (arr: T[]) => T[]
type Prepend_ = _Prepend_ & _Prepend2_

const _prepend_: _Prepend_ = (value, arr) => [value].concat(arr)

/**
 * Adds a value at the beginning of the array.
 * Similar to Array.prototype.unshift, but immutable.
 *
 * @param value Additional value
 * @param arr Initial array
 * @returns New array
 */
const prepend_: Prepend_ = curry(_prepend_)

export { prepend_ }
export default prepend_
