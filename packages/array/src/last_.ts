type Last = <T>(arr: T[]) => T

/**
 * Retrieves the last element of the array.
 *
 * @param arr Initial array
 * @returns Last element (undefined for an empty array)
 */
const last_: Last = (arr) => arr[arr.length - 1]

export { last_ }
export default last_
