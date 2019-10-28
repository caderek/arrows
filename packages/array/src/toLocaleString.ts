type ToLocaleString = <T>(arr: T[]) => string

/**
 * Functional wrapper for Array.prototype.toLocaleString
 *
 * Creates a string representation of an array.
 * The elements are converted to string using their toLocalString methods.
 *
 * @param arr Initial array
 * @returns String representation
 */
const toLocaleString: ToLocaleString = (arr) => arr.toLocaleString()

export { toLocaleString }
export default toLocaleString
