import curry from "@arrows/composition/curry"

type _Includes = <T>(element: T, arr: T[]) => boolean
type _Includes2 = <T>(element: T) => (arr: T[]) => boolean
type Includes = _Includes & _Includes2

const _includes: _Includes = (element, arr) => arr.includes(element)

/**
 * Determines whether an array includes a certain element,
 * returning true or false as appropriate.
 *
 * @param element Searched element
 * @param arr Initial array
 * @returns True if element exists, false otherwise
 */
const includes: Includes = curry(_includes)

export { includes }
export default includes
