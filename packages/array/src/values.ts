type Values = <T>(arr: T[]) => IterableIterator<T>

/**
 * Functional wrapper for Array.prototype.values
 *
 * Creates an iterable of values in the array.
 *
 * @param arr Initial array
 * @returns Iterator
 */
const values: Values = (arr) => arr.values()

export { values }
export default values
