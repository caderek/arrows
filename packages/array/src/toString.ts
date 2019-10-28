type ToString = <T>(arr: T[]) => string

/**
 * Functional wrapper for Array.prototype.toString
 *
 * Creates a string representation of an array.
 *
 * @param arr Initial array
 * @returns String representation
 */
const toString: ToString = (arr) => arr.toString()

export { toString }
export default toString
