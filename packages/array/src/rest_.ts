type Rest_ = <T>(arr: T[]) => T[]

/**
 * Creates new array without the first element.
 *
 * @param arr Initial array
 * @returns New array
 */
const rest_: Rest_ = (arr) => arr.slice(1)

export { rest_ }
export default rest_
