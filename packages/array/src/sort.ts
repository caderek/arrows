import curry from '@arrows/composition/curry'
import { cursorTo } from 'readline'

type CompareFn<T> = (a: T, b: T) => number

type _Sort = <T>(compareFn: CompareFn<T>, arr: T[]) => T[]
type _Sort2 = <T>(compareFn: CompareFn<T>) => (arr: T[]) => T[]
type CurriedSort = _Sort & _Sort2

type Sort = CurriedSort & {
  num(a: number[]): number[]
  numDesc(a: number[]): number[]
  str(a: string[]): string[]
  strDesc(a: string[]): string[]
}

const _sort: _Sort = (fn, arr) => [...arr].sort(fn)

const curriesSort: CurriedSort = curry(_sort)

/**
 * Creates a new, sorted array.
 * Have built-in methods for sorting numerical and string arrays.
 *
 * @param compareFn Compare function
 * @param arr Initial array
 * @returns New array
 *
 * @property {Function} num Sorts numerical arrays in an ascending order
 * @property {Function} numDesc Sorts numerical arrays in a descending order
 * @property {Function} str Sorts string arrays in an ascending order
 * @property {Function} strDesc Sorts string arrays in a descending order
 */
const sort: Sort = Object.assign(curriesSort, {
  num: curriesSort((a: number, b: number) => a - b),
  numDesc: curriesSort((a: number, b: number) => b - a),
  str: curriesSort((a: string, b: string) => (a > b ? 1 : -1)),
  strDesc: curriesSort((a: string, b: string) => (b > a ? 1 : -1)),
})

export { sort }
export default sort
