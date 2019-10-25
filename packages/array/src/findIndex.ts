import curry from '@arrows/composition/curry'

type TestFn<T> = (element: T, index: number, arr: T[]) => boolean

type _FindIndex = <T>(testFn: TestFn<T>, arr: T[]) => number
type _FindIndex2 = <T>(testFn: TestFn<T>) => (arr: T[]) => number
type FindIndex = _FindIndex & _FindIndex2

const _findIndex: _FindIndex = (testFn, arr) => arr.findIndex(testFn)

/**
 * Functional wrapper for Array.prototype.findIndex
 *
 * Retrieves the index of the first element in the array
 * where predicate is true, and -1 otherwise.
 *
 * @param testFn Test function
 * @param arr Initial array
 * @returns Index of the matching element or -1
 */
const findIndex: FindIndex = curry(_findIndex)

export { findIndex }
export default findIndex
