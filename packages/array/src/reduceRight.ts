import curry from "@arrows/composition/curry"

type ReducingFirstFn<V> = (
  accumulator: V,
  currentValue: V,
  index?: number,
  arr?: V[],
) => V

type _ReduceRightFirst = <T>(reducingFn: ReducingFirstFn<T>, arr: T[]) => T
type _ReduceRightFirst2 = <T>(reducingFn: ReducingFirstFn<T>) => (arr: T[]) => T

type ReduceRightFirst = _ReduceRightFirst & _ReduceRightFirst2

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

type _ReduceRight = <T, X>(
  reducingFn: ReducingFn<T, X>,
  initialValue: X,
  arr: T[],
) => X

type CurriedReduceRight = _ReduceRight & Curry3

type ReduceRight = CurriedReduceRight & {
  first: ReduceRightFirst
}

const _reduceRightFirst: _ReduceRightFirst = (reducingFn, arr) =>
  arr.reduce(reducingFn)

const reduceRightFirst: ReduceRightFirst = curry(_reduceRightFirst)

const _reduceRight: _ReduceRight = (reducingFn, initialValue, arr) =>
  arr.reduceRight(reducingFn, initialValue)

const curriedReduceRight: CurriedReduceRight = curry(_reduceRight)

/**
 * Functional wrapper for Array.prototype.reduceRight
 *
 * Calls the specified callback function for all the elements in an array,
 * in descending order.
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
const reduceRight: ReduceRight = Object.assign(curriedReduceRight, {
  /**
   * Reduce without initializer.
   * The last element of the array will be used as an initial accumulator.
   *
   * @param reducingFn Reducing function
   * @param arr Initial array
   * @returns Final accumulator value
   */
  first: reduceRightFirst,
})

export { reduceRight }
export default reduceRight
