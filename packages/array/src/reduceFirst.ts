import curry from '@arrows/composition/curry'

type ReducingFn<V> = (
  accumulator: V,
  currentValue: V,
  index?: number,
  arr?: V[],
) => V

type _ReduceFirst = <T>(reducingFn: ReducingFn<T>, arr: T[]) => T
type _ReduceFirst2 = <T>(reducingFn: ReducingFn<T>) => (arr: T[]) => T

type ReduceFirst = _ReduceFirst & _ReduceFirst2

const _reduceFirst: _ReduceFirst = (reducingFn, arr) => arr.reduce(reducingFn)

/**
 * Functional wrapper for Array.prototype.reduce without initializer
 *
 * Calls the specified reducing function for all the elements in an array.
 * The return value of the reducing function is the accumulated result,
 * and is provided as an argument in the next call to the reducing function.
 *
 * @param reducingFn Reducing function
 * @param arr Initial array
 * @returns Final accumulator value
 */
const reduceFirst: ReduceFirst = curry(_reduceFirst)

export { reduceFirst }
export default reduceFirst
