import curry from '@arrows/composition/curry'

type ZippingFn<T, V, X> = (
  otherArrItem: V | undefined,
  arrItem: T | undefined,
) => X

type Curry1<T, X> = (arr: T[]) => X[]

type Curry2<T, V, X> = {
  (otherArr: V[]): Curry1<T, X>
  (otherArr: V[], arr: T[]): X[]
}

type Curry3 = {
  <T, V, X>(zippingFn: ZippingFn<T, V, X>): Curry2<T, V, X>
  <T, V, X>(zippingFn: ZippingFn<T, V, X>, otherArr: V[]): Curry1<T, X>
}

type _ZipAllWith_ = <T, V, X>(
  zippingFn: ZippingFn<T, V, X>,
  otherArr: V[],
  arr: T[],
) => X[]

type ZipAllWith_ = _ZipAllWith_ & Curry3

const _zipAllWith_: _ZipAllWith_ = (zippingFn, otherArr, arr) => {
  const length = Math.max(arr.length, otherArr.length)
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
 * Zips until the length of the longer array is reached.
 *
 * @param zippingFn Zipping function
 * @param otherArr Array that you want to zip with initial array
 * @param arr Initial array
 * @returns New, zipped array
 */
const zipAllWith_: ZipAllWith_ = curry(_zipAllWith_)

export { zipAllWith_ }
export default zipAllWith_
