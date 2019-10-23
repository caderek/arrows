type ButLast_ = <T>(arr: T[]) => T[]

/**
 * Creates a new array from the initial one, without the last element.
 *
 * @param arr Initial array
 * @returns New array
 */
const butLast_: ButLast_ = (arr) => arr.slice(0, -1)

export { butLast_ }
export default butLast_
