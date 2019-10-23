type First_ = <T>(arr: T[]) => T

/**
 * Retrieves the first element of the array.
 *
 * @param arr Initial array
 * @returns First element
 */
const first_: First_ = (arr) => arr[0]

export { first_ }
export default first_
