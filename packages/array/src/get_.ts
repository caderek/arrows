import curry from "@arrows/composition/curry"

type _Get_ = <T>(index: number, arr: T[]) => T | undefined
type _Get2_ = <T>(index: number) => (arr: T[]) => T | undefined
type Get_ = _Get_ & _Get2_

const _get_: _Get_ = (index, arr) => arr[index]

/**
 * Retrieves an element at the specific index.
 *
 * @param index Specific index
 * @returns Element at the specific index
 */
const get_: Get_ = curry(_get_)

export { get_ }
export default get_
