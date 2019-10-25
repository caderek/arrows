type FlatOne = <T>(arr: T[]) => T[]

/**
 * Functional wrapper for Array.prototype.flat with default depth (1).
 *
 * Creates a new array with all sub-array elements
 * concatenated into it recursively up to the specified depth.
 *
 * @param arr Initial array
 * @returns New array
 */
const flatOne: FlatOne = (arr) => arr.flat()

export { flatOne }
export default flatOne
