import curry from "@arrows/composition/curry"

type _Has_ = (index: number, arr: unknown[]) => boolean
type _Has2_ = (index: number) => (arr: unknown[]) => boolean
type Has_ = _Has_ & _Has2_

const _has_: _Has_ = (index, arr) => index < arr.length

/**
 * Determines whether an array has a certain index,
 * returning true or false as appropriate.
 *
 * @param index Specific index
 * @param arr Initial array
 * @returns True if index exists, false otherwise
 */
const has_: Has_ = curry(_has_)

export { has_ }
export default has_
