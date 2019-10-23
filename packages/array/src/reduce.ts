import curry from '@arrows/composition/curry'

type ReducingFn<V, A> = (
  accumulator: A,
  currentValue: V,
  index?: number,
  arr?: V[],
) => A

type Curry1<T, X> = (arr: T[]) => X

type Curry2<T, X> = {
  (initialValue: X): Curry1<T, X>
  (initialValue: X, arr: T[]): X
}

type Curry3 = {
  <T, X>(reducingFn: ReducingFn<T, X>): Curry2<T, X>
  <T, X>(reducingFn: ReducingFn<T, X>, initialValue: X): Curry1<T, X>
}

type _Reduce = <T, X>(
  reducingFn: ReducingFn<T, X>,
  initialValue: X,
  arr: T[],
) => X

type Reduce = _Reduce & Curry3

const _reduce: _Reduce = (reducingFn, initialValue, arr) =>
  arr.reduce(reducingFn, initialValue)

/**
 * Functional wrapper for Array.prototype.reduce
 *
 * Calls the specified reducing function for all the elements in an array.
 * The return value of the reducing function is the accumulated result,
 * and is provided as an argument in the next call to the reducing function.
 *
 * @param reducingFn Reducing function
 * @param initialValue Initial value of the accumulator
 * @param arr Initial array
 * @returns Final accumulator value
 */
const reduce: Reduce = curry(_reduce)

export { reduce }
export default reduce
