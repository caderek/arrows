import curry from '@arrows/composition/curry'

type ZippingFn<T, V, X> = (otherArrItem: V, arrItem: T) => X

type Curry1<T, X> = (arr: T[]) => X[]

type Curry2<T, V, X> = {
  (otherArr: V[]): Curry1<T, X>
  (otherArr: V[], arr: T[]): X[]
}

type Curry3 = {
  <T, V, X>(zippingFn: ZippingFn<T, V, X>): Curry2<T, V, X>
  <T, V, X>(zippingFn: ZippingFn<T, V, X>, otherArr: V[]): Curry1<T, X>
}

type _ZipWith_ = <T, V, X>(
  zippingFn: ZippingFn<T, V, X>,
  otherArr: V[],
  arr: T[],
) => X[]

type ZipWith_ = _ZipWith_ & Curry3

const _zipWith_: _ZipWith_ = (zippingFn, otherArr, arr) => {
  const length = Math.min(arr.length, otherArr.length)
  const newArr = []

  for (let i = 0; i < length; i++) {
    const value = zippingFn(otherArr[i], arr[i])
    newArr.push(value)
  }

  return newArr
}

/**
 * Zips two arrays producing new values with a zipping function,
 * that takes elements with the same indexes.
 * Zips until the length of the shorter array is reached.
 *
 * @param zippingFn Zipping function
 * @param otherArr Array that you want to zip with initial array
 * @param arr Initial array
 * @returns New, zipped array
 */
const zipWith_: ZipWith_ = curry(_zipWith_)

export { zipWith_ }
export default zipWith_

const a = zipWith_((a: number, b: string) => a + b)([1, 2, 3], ['foo', 'bar'])
