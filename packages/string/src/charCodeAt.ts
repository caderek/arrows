import { curry } from '@arrows/composition/curry'
type _CharCodeAt = (index: number, str: string) => number
type _CharCodeAt2 = (index: number) => (str: string) => number
type CharCodeAt = _CharCodeAt & _CharCodeAt2

const _charCodeAt: _CharCodeAt = (index, str) => str.charCodeAt(index)

/**
 * Functional wrapper for String.prototype.charCodeAt
 *
 * Retrieves the Unicode value of the character at the specified location.
 *
 * @param index Specific index
 * @param str Initial string
 * @returns Unicode value or NaN if out of band.
 */
const charCodeAt: CharCodeAt = curry(_charCodeAt)

export { charCodeAt }
export default charCodeAt
