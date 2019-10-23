import curry from '@arrows/composition/curry'
import pipe from '@arrows/composition/pipe'

type _Flat = <T>(depth: number, arr: T[]) => unknown[]
type _Flat2 = <T>(depth: number) => (arr: T[]) => unknown[]
type Flat = _Flat & _Flat2

const _flat: _Flat = (depth, arr) => arr.flat(depth)

/**
 * Functional wrapper for Array.prototype.flat with custom depth
 *
 * Creates a new array with all sub-array elements
 * concatenated into it recursively up to the specified depth.
 *
 * @param depth Maximum recursion depth
 * @param arr Initial array
 * @returns New array
 */
const flat: Flat = curry(_flat)

export { flat }
export default flat
