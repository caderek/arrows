import curry from '@arrows/composition/curry'

type ReducingFirstFn<V> = (
  accumulator: V,
  currentValue: V,
  index?: number,
  arr?: V[],
) => V

type _ReduceFirst = <T>(reducingFn: ReducingFirstFn<T>, arr: T[]) => T
type _ReduceFirst2 = <T>(reducingFn: ReducingFirstFn<T>) => (arr: T[]) => T

type ReduceFirst = _ReduceFirst & _ReduceFirst2

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

type CurriedReduce = _Reduce & Curry3

type Reduce = CurriedReduce & {
  first: ReduceFirst
}

const _reduceFirst: _ReduceFirst = (reducingFn, arr) => arr.reduce(reducingFn)

const reduceFirst: ReduceFirst = curry(_reduceFirst)

const _reduce: _Reduce = (reducingFn, initialValue, arr) =>
  arr.reduce(reducingFn, initialValue)

const curriedReduce: CurriedReduce = curry(_reduce)

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
 *
 * @method first Reduce without initializer
 */
const reduce: Reduce = Object.assign(curriedReduce, {
  /**
   * Reduce without initializer.
   * The first element of the array will be used as an initial accumulator.
   *
   * @param reducingFn Reducing function
   * @param arr Initial array
   * @returns Final accumulator value
   */
  first: reduceFirst,
})

export { reduce }
export default reduce
