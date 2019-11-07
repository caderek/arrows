import { curry } from '@arrows/composition/curry'
type _CharAt = (index: number, str: string) => string
type _CharAt2 = (index: number) => (str: string) => string
type CharAt = _CharAt & _CharAt2

const _charAt: _CharAt = (index, str) => str.charAt(index)

/**
 * Functional wrapper for String.prototype.charAt
 *
 * Retrieves the character at the specified index.
 *
 * @param index Specific index
 * @param str Initial string
 * @returns Character or empty string if out of bound.
 */
const charAt: CharAt = curry(_charAt)

export { charAt }
export default charAt
