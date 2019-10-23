import curry from '@arrows/composition/curry'

type MappingFn<V> = (currentValue?: V, index?: number, array?: V[]) => unknown
type _Map = <T>(mappingFn: MappingFn<T>, arr: T[]) => unknown[]
type _Map2 = <T>(mappingFn: MappingFn<T>) => (arr: T[]) => unknown[]
type Map = _Map & _Map2

const _map: _Map = (fn, arr) => arr.map(fn)

/**
 * Functional wrapper for Array.prototype.map
 *
 * Calls a defined mapping function on each element of an array,
 * and returns an array that contains the results.
 *
 * @param mappingFn Mapping function
 * @param arr Initial array
 * @return New array
 */
const map: Map = curry(_map)

export { map }
export default map
