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

type _LastIndexOf = <T>(element: T, fromIndex: number, arr: T[]) => number

type CurriedLastIndexOf = _LastIndexOf & Curry3

type _LastIndexOfAll = <T>(element: T, arr: T[]) => number
type _LastIndexOfAll2 = <T>(element: T) => (arr: T[]) => number
type LastIndexOfAll = _LastIndexOfAll & _LastIndexOfAll2

type LastIndexOf = CurriedLastIndexOf & {
  all: LastIndexOfAll
}

const lastIndexOfAll: _LastIndexOfAll = (element, arr) =>
  arr.lastIndexOf(element)

const _lastIndexOf: _LastIndexOf = (element, fromIndex, arr) =>
  arr.lastIndexOf(element, fromIndex)

const curriedLastIndexOf: CurriedLastIndexOf = curry(_lastIndexOf)

/**
 * Functional wrapper for Array.prototype.lastIndexOf
 *
 * Retrieves the index of the last occurrence of a specified value in an array.
 * The array is searched backwards, starting at fromIndex.
 *
 * @param element The value to locate in the array
 * @param fromIndex The array index at which to begin the search
 * @param arr Initial array
 * @returns Index of the matching element or -1
 *
 * @method all Version with implicit fromIndex (arr.length - 1)
 */
const lastIndexOf: LastIndexOf = Object.assign(curriedLastIndexOf, {
  /**
   * Version with implicit fromIndex (arr.length - 1).
   *
   * @param element The value to locate in the array
   * @param arr Initial array
   * @returns Index of the matching element or -1
   */
  all: curry(lastIndexOfAll),
})

export { lastIndexOf }
export default lastIndexOf
