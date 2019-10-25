type Entries = <T>(arr: T[]) => IterableIterator<[number, T]>

/**
 * Functional wrapper for Array.prototype.entries
 *
 * Creates an iterable of index, value pairs for every entry in the array.
 *
 * @param arr Initial array
 * @returns Iterable of index-value pairs
 */
const entries: Entries = (arr) => arr.entries()

export { entries }
export default entries
