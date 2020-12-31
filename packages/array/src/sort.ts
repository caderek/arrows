import curry from "@arrows/composition/curry"

type CompareFn<T> = (a: T, b: T) => number

type _Sort = <T>(compareFn: CompareFn<T>, arr: T[]) => T[]
type _Sort2 = <T>(compareFn: CompareFn<T>) => (arr: T[]) => T[]
type CurriedSort = _Sort & _Sort2

type Sort = CurriedSort & {
  num(a: number[]): number[]
  numDesc(a: number[]): number[]
  str(a: string[]): string[]
  strDesc(a: string[]): string[]
  locale(a: string[]): string[]
  localeDesc(a: string[]): string[]
}

const _sort: _Sort = (fn, arr) => [...arr].sort(fn)

const curriedSort: CurriedSort = curry(_sort)

/**
 * Creates a new, sorted array.
 * Have built-in methods for sorting numerical and string arrays.
 *
 * @param compareFn Compare function
 * @param arr Initial array
 * @returns New array
 *
 * @method num Sorts numerical arrays in an ascending order
 * @method numDesc Sorts numerical arrays in a descending order
 * @method str Sorts string arrays in an ascending order using comparison operators
 * @method strDesc Sorts string arrays in a descending order  using comparison operators
 * @method locale Sorts string arrays in an ascending order using localeCompare
 * @method localeDesc Sorts string arrays in a descending order  using localeCompare
 */
const sort: Sort = Object.assign(curriedSort, {
  /**
   * Sorts numerical arrays in an ascending order
   *
   * @param arr Initial array
   * @returns New array
   */
  num: curriedSort((a: number, b: number) => a - b),
  /**
   * Sorts numerical arrays in a descending order
   *
   * @param arr Initial array
   * @returns New array
   */
  numDesc: curriedSort((a: number, b: number) => b - a),
  /**
   * Sorts string arrays in an ascending order using comparison operators.
   *
   * @param arr Initial array
   * @returns New array
   */
  str: curriedSort((a: string, b: string) => (a === b ? 0 : a > b ? 1 : -1)),
  /**
   * Sorts string arrays in a descending order using comparison operators.
   *
   * @param arr Initial array
   * @returns New array
   */
  strDesc: curriedSort((a: string, b: string) =>
    a === b ? 0 : a > b ? -1 : 1,
  ),
  /**
   * Sorts string arrays in an ascending order using `String.prototype.localeCompare`.
   *
   * Uses String.prototype.localeCompare
   *
   * @param arr Initial array
   * @returns New array
   */
  locale: curriedSort((a: string, b: string) => a.localeCompare(b)),
  /**
   * Sorts string arrays in a descending order using `String.prototype.localeCompare`.
   *
   * @param arr Initial array
   * @returns New array
   */
  localeDesc: curriedSort((a: string, b: string) => b.localeCompare(a)),
})

export { sort }
export default sort
