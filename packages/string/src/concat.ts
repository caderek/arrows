import { curry } from '@arrows/composition/curry'
type _Concat = (strToAdd: string, str: string) => string
type _Concat2 = (strToAdd: string) => (str: string) => string
type Concat = _Concat & _Concat2

const _concat: _Concat = (strToAdd, str) => str.concat(strToAdd)

/**
 * Functional wrapper for String.prototype.concat
 *
 * Combines two strings.
 *
 * @param strToAdd The strings to append to the end of the string.
 * @param str Initial string
 * @returns Character or empty string if out of bound.
 */
const concat: Concat = curry(_concat)

export { concat }
export default concat
