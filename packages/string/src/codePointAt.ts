import { curry } from '@arrows/composition/curry'
type _CodePointAt = (pos: number, str: string) => number | undefined
type _CodePointAt2 = (pos: number) => (str: string) => number | undefined
type CodePointAt = _CodePointAt & _CodePointAt2

const _codePointAt: _CodePointAt = (pos, str) => str.codePointAt(pos)

/**
 * Functional wrapper for String.prototype.codePointAt
 *
 * Returns a nonnegative integer Number less than 1114112 (0x110000)
 * that is the code point value of the UTF-16 encoded code point
 * starting at the string element at position pos
 * in the String resulting from converting this object to a String.
 * If there is no element at that position, the result is undefined.
 * If a valid UTF-16 surrogate pair does not begin at pos,
 * the result is the code unit at pos.
 *
 * @param pos Specific position
 * @param str Initial string
 * @returns UTF-16 code point value or undefined.
 */
const codePointAt: CodePointAt = curry(_codePointAt)

export { codePointAt }
export default codePointAt
