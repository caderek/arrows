import curry from '@arrows/composition/curry'

type ReducingFn<V> = (
  accumulator: V,
  currentValue: V,
  index?: number,
  arr?: V[],
) => V

type _ReduceSelf = <T>(reducingFn: ReducingFn<T>, arr: T[]) => T
type _ReduceSelf2 = <T>(reducingFn: ReducingFn<T>) => (arr: T[]) => T

type ReduceSelf = _ReduceSelf & _ReduceSelf2

const _reduceSelf: _ReduceSelf = (reducingFn, arr) => arr.reduce(reducingFn)

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
const reduceSelf: ReduceSelf = curry(_reduceSelf)

export { reduceSelf }
export default reduceSelf
