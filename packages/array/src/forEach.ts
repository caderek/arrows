import curry from "@arrows/composition/curry"

type SideEffectFn<T> = (
  currentValue?: T,
  index?: number,
  array?: T[],
) => unknown

type _ForEach = <T>(sideEffectFn: SideEffectFn<T>, arr: T[]) => void
type _ForEach2 = <T>(sideEffectFn: SideEffectFn<T>) => (arr: T[]) => void
type ForEach = _ForEach & _ForEach2

const _forEach: _ForEach = (sideEffectFn, arr) => arr.forEach(sideEffectFn)

/**
 * Functional wrapper for Array.prototype.forEach
 *
 * Performs the specified side effect action for each element in an array.
 *
 * @param sideEffectFn Side effect function
 * @param arr Initial array
 * @returns Nothing (undefined)
 */
const forEach: ForEach = curry(_forEach)

export { forEach }
export default forEach
