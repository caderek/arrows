import curry from "@arrows/composition/curry"

type TestFn<T> = (element: T, index: number, arr: T[]) => boolean

type _Find = <T>(testFn: TestFn<T>, arr: T[]) => T | undefined
type _Find2 = <T>(testFn: TestFn<T>) => (arr: T[]) => T | undefined
type Find = _Find & _Find2

const _find: _Find = (testFn, arr) => arr.find(testFn)

/**
 * Functional wrapper for Array.prototype.find
 *
 * Retrieves the value of the first element in the array
 * where predicate is true, and undefined otherwise.
 *
 * @param testFn Test function
 * @param arr Initial array
 * @returns Item that matches predicate or undefined
 */
const find: Find = curry(_find)

export { find }
export default find
