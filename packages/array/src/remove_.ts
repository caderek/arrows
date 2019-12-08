import curry from "@arrows/composition/curry"

type _Remove_ = <T>(index: number, arr: T[]) => T[]
type _Remove2_ = <T>(index: number) => (arr: T[]) => T[]
type Remove_ = _Remove_ & _Remove2_

const _remove_: _Remove_ = (index, arr) =>
  arr.slice(0, index).concat(arr.slice(index + 1))

/**
 * Creates a new array without an item at the provided index.
 *
 * @param index Specific index
 * @param arr Initial array
 * @returns New array
 */
const remove_: Remove_ = curry(_remove_)

export { remove_ }
export default remove_
