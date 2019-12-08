import curry from "@arrows/composition/curry"

type TestFn<T> = (element: T, index: number, arr: T[]) => boolean

type _Every = <T>(testFn: TestFn<T>, arr: T[]) => boolean
type _Every2 = <T>(testFn: TestFn<T>) => (arr: T[]) => boolean
type Every = _Every & _Every2

const _every: _Every = (testFn, arr) => arr.every(testFn)

/**
 * Functional wrapper for Array.prototype.every
 *
 * Determines whether all the members of an array satisfy the specified test.
 *
 * @param testFn Test function
 * @param arr Initial array
 * @returns True if all elements satisfy test function, false otherwise
 */
const every: Every = curry(_every)

export { every }
export default every
