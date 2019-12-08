import curry from "@arrows/composition/curry"

type _Append_ = <T>(value: T, arr: T[]) => T[]
type _Append2_ = <T>(value: T) => (arr: T[]) => T[]
type Append_ = _Append_ & _Append2_

const _append_: _Append_ = (value, arr) => arr.concat([value])

/**
 * Adds a value at the end of the array.
 * Similar to Array.prototype.push, but immutable.
 *
 * @param value Additional value
 * @param arr Initial array
 * @returns New array
 */
const append_: Append_ = curry(_append_)

export { append_ }
export default append_
