import curry from "@arrows/composition/curry"

type Curry1<T> = (arr: T[]) => number

type Curry2<T> = {
  (fromIndex: number): Curry1<T>
  (fromIndex: number, arr: T[]): number
}

type Curry3 = {
  <T>(element: T): Curry2<T>
  <T>(element: T, fromIndex: number): Curry1<T>
}

type _IndexOf = <T>(element: T, fromIndex: number, arr: T[]) => number

type CurriedIndexOf = _IndexOf & Curry3

type _IndexOfAll = <T>(element: T, arr: T[]) => number
type _IndexOfAll2 = <T>(element: T) => (arr: T[]) => number
type IndexOfAll = _IndexOfAll & _IndexOfAll2

type IndexOf = CurriedIndexOf & {
  all: IndexOfAll
}

const indexOfAll: _IndexOfAll = (element, arr) => arr.indexOf(element)

const _indexOf: _IndexOf = (element, fromIndex, arr) =>
  arr.indexOf(element, fromIndex)

const curriedIndexOf: CurriedIndexOf = curry(_indexOf)

/**
 * Functional wrapper for Array.prototype.indexOf
 *
 * Retrieves the index of the first occurrence of a value in an array.
 *
 * @param element The value to locate in the array
 * @param fromIndex The array index at which to begin the search
 * @param arr Initial array
 * @returns Index of the matching element or -1
 *
 * @method all Version with implicit fromIndex (0).
 */
const indexOf: IndexOf = Object.assign(curriedIndexOf, {
  /**
   * Version with implicit fromIndex (0).
   *
   * @param element The value to locate in the array
   * @param arr Initial array
   * @returns Index of the matching element or -1
   */
  all: curry(indexOfAll),
})

export { indexOf }
export default indexOf
