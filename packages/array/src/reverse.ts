type Reverse = <T>(arr: T[]) => T[]

/**
 * Creates a new array with reversed elements.
 *
 * @param arr Initial array
 * @returns New array
 */
const reverse: Reverse = (arr) => [...arr].reverse()

export { reverse }
export default reverse
