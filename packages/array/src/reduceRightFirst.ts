import curry from '@arrows/composition/curry'

type ReducingFn<V> = (
  accumulator: V,
  currentValue: V,
  index?: number,
  arr?: V[],
) => V

type _ReduceRightFirst = <T>(reducingFn: ReducingFn<T>, arr: T[]) => T
type _ReduceRightFirst2 = <T>(reducingFn: ReducingFn<T>) => (arr: T[]) => T

type ReduceRightFirst = _ReduceRightFirst & _ReduceRightFirst2

const _reduceRightFirst: _ReduceRightFirst = (reducingFn, arr) =>
  arr.reduceRight(reducingFn)

/**
 * Functional wrapper for Array.prototype.reduceRight without initializer
 *
 * Calls the specified reducing function for all the elements in an array,
 * in descending order.
 * The return value of the reducing function is the accumulated result,
 * and is provided as an argument in the next call to the reducing function.
 *
 * @param reducingFn Reducing function
 * @param arr Initial array
 * @returns Final accumulator value
 */
const reduceRightFirst: ReduceRightFirst = curry(_reduceRightFirst)

export { reduceRightFirst }
export default reduceRightFirst
