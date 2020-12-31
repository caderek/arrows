import curry from "@arrows/composition/curry"

type FlatOne = <T>(arr: T[][]) => T[]
type _Flat = <T>(depth: number, arr: T[]) => unknown[]
type _Flat2 = <T>(depth: number) => (arr: T[]) => unknown[]
type CurriedFlat = _Flat & _Flat2
type Flat = CurriedFlat & {
  one: FlatOne
}

const _flat: _Flat = (depth, arr) => arr.flat(depth)

const curriedFlat: CurriedFlat = curry(_flat)

const flatOne: FlatOne = (arr) => arr.flat()

/**
 * Functional wrapper for Array.prototype.flat with custom depth
 *
 * Creates a new array with all sub-array elements
 * concatenated into it recursively up to the specified depth.
 *
 * @param depth Maximum recursion depth
 * @param arr Initial array
 * @returns New array
 *
 * @method one Version with default depth (1)
 */
const flat: Flat = Object.assign(curriedFlat, {
  /**
   * Version with default depth (1).
   *
   * @param arr Initial array
   * @returns New array
   */
  one: flatOne,
})

export { flat }
export default flat
