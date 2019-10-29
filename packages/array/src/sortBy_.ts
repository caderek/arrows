import curry from '@arrows/composition/curry'

type CompareFn<V> = (a: V, b: V) => number
type MappingFn<T, V> = (element: T) => V

type Curry1<T> = (arr: T[]) => T[]

type Curry2<T, V> = {
  (mappingFn: MappingFn<T, V>): Curry1<T>
  (mappingFn: MappingFn<T, V>, arr: T[]): T[]
}

type Curry3 = {
  <T, V>(compareFn: CompareFn<V>): Curry2<T, V>
  <T, V>(compareFn: CompareFn<V>, mappingFn: MappingFn<T, V>): Curry1<T>
}

type _SortBy_ = <T, V>(
  compareFn: CompareFn<V>,
  mappingFn: MappingFn<T, V>,
  arr: T[],
) => T[]

type CurriedSortBy_ = _SortBy_ & Curry3

type PartiallyApplied = {
  <T, V>(mappingFn: MappingFn<T, V>): Curry1<T>
  <T, V>(mappingFn: MappingFn<T, V>, arr: T[]): T[]
}

type SortBy_ = CurriedSortBy_ & {
  num: PartiallyApplied
  numDesc: PartiallyApplied
  str: PartiallyApplied
  strDesc: PartiallyApplied
}

const _sortBy_: _SortBy_ = (compareFn, mappingFn, arr) => {
  return [...arr].sort((a, b) => compareFn(mappingFn(a), mappingFn(b)))
}

const curriedSortBy_ = curry(_sortBy_)

/**
 * Creates a new, sorted array.
 * Accepts mapping function that maps values before comparing
 * (mapping does not affect actual values of the array).
 * Have built-in methods for sorting numerical and alphabetical sorting.
 *
 * @param compareFn Compare function
 * @param mappingFn Mapping function
 * @param arr Initial array
 * @returns New array
 *
 * @method num Sorts numerical arrays in an ascending order
 * @method numDesc Sorts numerical arrays in a descending order
 * @method str Sorts string arrays in an ascending order
 * @method strDesc Sorts string arrays in a descending order
 */
const sortBy_: SortBy_ = Object.assign(curriedSortBy_, {
  /**
   * Sorts numerical arrays in an ascending order
   *
   * @param mappingFn Mapping function
   * @param arr Initial array
   * @returns New array
   */
  num: curriedSortBy_((a: number, b: number) => a - b),
  /**
   * Sorts numerical arrays in a descending order
   *
   * @param mappingFn Mapping function
   * @param arr Initial array
   * @returns New array
   */
  numDesc: curriedSortBy_((a: number, b: number) => b - a),
  /**
   * Sorts string arrays in an ascending order
   *
   * @param mappingFn Mapping function
   * @param arr Initial array
   * @returns New array
   */
  str: curriedSortBy_((a: string, b: string) => (a > b ? 1 : -1)),
  /**
   * Sorts string arrays in a descending order
   *
   * @param mappingFn Mapping function
   * @param arr Initial array
   * @returns New array
   */
  strDesc: curriedSortBy_((a: string, b: string) => (b > a ? 1 : -1)),
})

export { sortBy_ }
export default sortBy_
