import curry from "@arrows/composition/curry"

type _SetSize_ = <T>(size: number, arr: T[]) => (T | undefined)[]
type _SetSize2_ = <T>(size: number) => (arr: T[]) => (T | undefined)[]
type SetSize_ = _SetSize_ & _SetSize2_

const _setSize_: _SetSize_ = (size, arr) => {
  return size <= arr.length
    ? arr.slice(0, size)
    : arr.slice(0).concat(new Array(size - arr.length).fill(undefined))
}

/**
 * Creates a new array trimmed/extended to a provided size.
 * If the new array is longer than the initial one,
 * additional indexes will be set to undefined.
 *
 * @param size Required size
 * @param arr Initial array
 * @returns New array
 */
const setSize_: SetSize_ = curry(_setSize_)

export { setSize_ }
export default setSize_
