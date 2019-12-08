import curry from "@arrows/composition/curry"

type FilteringFn<V> = (element: V, index: number, arr: V[]) => boolean
type _FilterNot_ = <T>(fn: FilteringFn<T>, arr: T[]) => T[]
type _FilterNot2_ = <T>(fn: FilteringFn<T>) => (arr: T[]) => T[]
type FilterNot_ = _FilterNot_ & _FilterNot2_

const _filterNot_: _FilterNot_ = (fn, arr) =>
  arr.filter((element, index, inputArr) => !fn(element, index, inputArr))

/**
 * Creates a new array from the initial one, without the values
 * that meet the condition specified in a filtering function.
 *
 * It is useful when you have a ready-to-use filtering function,
 * that you want to pass as an argument, otherwise you would have
 * to manually wrap it in a function to negate its results.
 *
 * @param fn Filtering function
 * @param arr initial array
 * @returns New array
 */
const filterNot_: FilterNot_ = curry(_filterNot_)

export { filterNot_ }
export default filterNot_
