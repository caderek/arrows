import curry from '@arrows/composition/curry'

type TestFn<T> = (element: T, index: number, arr: T[]) => boolean

type _Some = <T>(testFn: TestFn<T>, arr: T[]) => boolean
type _Some2 = <T>(testFn: TestFn<T>) => (arr: T[]) => boolean
type Some = _Some & _Some2

const _some: _Some = (testFn, arr) => arr.some(testFn)

/**
 * Functional wrapper for Array.prototype.some
 *
 * Determines whether the specified test function
 * returns true for any element of an array.
 *
 * @param testFn Test function
 * @param arr Initial array
 * @returns True if any element satisfies test function, false otherwise
 */
const some: Some = curry(_some)

export { some }
export default some
