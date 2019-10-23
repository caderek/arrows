type Has_ = (index: number) => (arr: unknown[]) => boolean

/**
 * Determines whether an array has a certain index,
 * returning true or false as appropriate.
 *
 * @param index Specific index
 * @returns True if index exists, false otherwise
 */
const has_: Has_ = (index) => (arr) => index < arr.length

export { has_ }
export default has_
