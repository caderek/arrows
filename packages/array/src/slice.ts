import curry from "@arrows/composition/curry"

type Curry1<T> = (arr: T[]) => T[]

type Curry2<T> = {
  (to: number): Curry1<T>
  (to: number, arr: T[]): T[]
}

type Curry3 = {
  <T>(from: number): Curry2<T>
  <T>(from: number, to: number): Curry1<T>
}

type _Slice = <T>(from: number, to: number, arr: T[]) => T[]

type _SliceFrom = <T>(from: number, arr: T[]) => T[]
type _SliceTo = <T>(to: number, arr: T[]) => T[]

type CurriesSlice = _Slice & Curry3

type Slice = CurriesSlice & {
  from: _SliceFrom & {
    <T>(from: number): (arr: T[]) => T[]
  }
  to: _SliceTo & {
    <T>(to: number): (arr: T[]) => T[]
  }
}

const _sliceFrom: _SliceFrom = (from, arr) => arr.slice(from)
const _sliceTo: _SliceTo = (to, arr) => arr.slice(0, to)

const _slice: _Slice = (from, to, arr) => arr.slice(from, to)

const curriedSlice: CurriesSlice = curry(_slice)

/**
 * Functional wrapper for Array.prototype.slice
 *
 * Creates a new array as a a section of an initial array.
 *
 * @param from The beginning of the specified portion of the array.
 * @param to The end of the specified portion of the array.
 * @param arr Initial array
 * @returns New array
 *
 * @method from Version with implicit end index (arr.length)
 * @method to Version with implicit start index (0)
 */
const slice: Slice = Object.assign(curriedSlice, {
  /**
   * Version with implicit end index (arr.length).
   *
   * @param from The beginning of the specified portion of the array.
   * @param arr Initial array
   * @returns New array
   */
  from: curry(_sliceFrom),
  /**
   * Version with implicit start index (0).
   *
   * @param to The end of the specified portion of the array.
   * @param arr Initial array
   * @returns New array
   */
  to: curry(_sliceTo),
})

export { slice }
export default slice
