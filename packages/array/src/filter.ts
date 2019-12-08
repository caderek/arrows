import curry from "@arrows/composition/curry"

type FilteringFn<V> = (element: V, index: number, arr: V[]) => boolean
type _Filter = <T>(fn: FilteringFn<T>, arr: T[]) => T[]
type _Filter2 = <T>(fn: FilteringFn<T>) => (arr: T[]) => T[]
type Filter = _Filter & _Filter2

const _filter: _Filter = (fn, arr) => arr.filter(fn)

/**
 * Functional wrapper for Array.prototype.filter
 *
 * Creates a new array from the initial one, without the values
 * that does not meet the condition specified in a filtering function.
 *
 * @param fn Filtering function
 * @param arr Initial array
 * @returns New array
 */
const filter: Filter = curry(_filter)

export { filter }
export default filter
