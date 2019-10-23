import curry from '@arrows/composition/curry'

type _Concat = <T>(value: T | T[], arr: T[]) => T[]
type _Concat2 = <T>(value: T | T[]) => (arr: T[]) => T[]
type Concat = _Concat & _Concat2

const _concat: _Concat = (value, arr) => arr.concat(value)

/**
 * Functional wrapper for Array.prototype.concat
 *
 * Combines two arrays.
 * If the concatenated value is not an array, adds it as a last element.
 *
 * @param value An array or single value to be concatenated
 * @param arr Initial array
 * @returns New array
 */
const concat: Concat = curry(_concat)

export { concat }
export default concat
