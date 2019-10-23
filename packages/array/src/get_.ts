type Get = <T>(index: number) => (arr: T[]) => T

/**
 * Retrieves an element at the specific index.
 *
 * @param index Specific index
 * @returns Element at the specific index
 */
const get_: Get = (index) => (arr) => arr[index]

export { get_ }
export default get_
