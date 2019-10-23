import curry from '@arrows/composition/curry'

type MappingFn<V> = (currentValue: V, index?: number, array?: V[]) => unknown
type _FlatMap = <T>(mappingFn: MappingFn<T>, arr: T[]) => unknown[]
type _FlatMap2 = <T>(mappingFn: MappingFn<T>) => (arr: T[]) => unknown[]
type FlatMap = _FlatMap & _FlatMap2

const _flatMap: _FlatMap = (mappingFn, arr) => arr.flatMap(mappingFn)

/**
 * Functional wrapper for Array.prototype.flatMap
 *
 * Calls a defined mapping function on each element of an array.
 * Then, flattens the result into a new array.
 * This is identical to a map followed by flat with depth 1.
 *
 * @param mappingFn Mapping function
 * @param arr Initial array
 * @returns New array
 */
const flatMap: FlatMap = curry(_flatMap)

export { flatMap }
export default flatMap
