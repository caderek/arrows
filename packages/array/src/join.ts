import curry from '@arrows/composition/curry'

type _Join = <T>(separator: string, arr: T[]) => string
type _Join2 = <T>(separator: string) => (arr: T[]) => string
type Join = _Join & _Join2

const _join: _Join = (separator, arr) => arr.join(separator)

/**
 * Functional wrapper for Array.prototype.join
 *
 * Adds all the elements of an array separated by the specified separator string.
 *
 * @param separator Separator
 * @param arr Initial array
 * @returns String of joined array elements.
 */
const join = curry(_join)

export { join }
export default join
