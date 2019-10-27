type Keys = <T>(arr: T[]) => IterableIterator<number>

/**
 * Functional wrapper for Array.prototype.keys
 *
 * Returns an iterable of keys in the array
 *
 * @param arr Initial array
 * @returns Iterator
 */
const keys: Keys = (arr) => arr.keys()

export { keys }
export default keys
