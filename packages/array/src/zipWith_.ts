import curry from '@arrows/composition/curry'

type ZippingAllFn<T, V, X> = (
  otherArrItem: V | undefined,
  arrItem: T | undefined,
) => X

type CurryAll1<T, X> = (arr: T[]) => X[]

type CurryAll2<T, V, X> = {
  (otherArr: V[]): CurryAll1<T, X>
  (otherArr: V[], arr: T[]): X[]
}

type CurryAll3 = {
  <T, V, X>(zippingFn: ZippingAllFn<T, V, X>): CurryAll2<T, V, X>
  <T, V, X>(zippingFn: ZippingAllFn<T, V, X>, otherArr: V[]): CurryAll1<T, X>
}

type _ZipAllWith_ = <T, V, X>(
  zippingFn: ZippingAllFn<T, V, X>,
  otherArr: V[],
  arr: T[],
) => X[]

type ZipAllWith_ = _ZipAllWith_ & CurryAll3

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

type CurriedZipWith_ = _ZipWith_ & Curry3

type ZipWith_ = CurriedZipWith_ & {
  all: ZipAllWith_
}

const _zipAllWith_: _ZipAllWith_ = (zippingFn, otherArr, arr) => {
  const length = Math.max(arr.length, otherArr.length)
  const newArr = []

  for (let i = 0; i < length; i++) {
    const value = zippingFn(otherArr[i], arr[i])
    newArr.push(value)
  }

  return newArr
}

const zipAllWith_: ZipAllWith_ = curry(_zipAllWith_)

const _zipWith_: _ZipWith_ = (zippingFn, otherArr, arr) => {
  const length = Math.min(arr.length, otherArr.length)
  const newArr = []

  for (let i = 0; i < length; i++) {
    const value = zippingFn(otherArr[i], arr[i])
    newArr.push(value)
  }

  return newArr
}

const curriedZipWith_: CurriedZipWith_ = curry(_zipWith_)

/**
 * Zips two arrays producing new values with a zipping function,
 * that takes elements with the same indexes.
 * Zips until the length of the shorter array is reached.
 *
 * @param zippingFn Zipping function
 * @param otherArr Array that you want to zip with initial array
 * @param arr Initial array
 * @returns New, zipped array
 *
 * @method all Zips until the length of the longer array is reached
 */
const zipWith_: ZipWith_ = Object.assign(curriedZipWith_, {
  /**
   * Zips until the length of the longer array is reached.
   *
   * @param zippingFn Zipping function
   * @param otherArr Array that you want to zip with initial array
   * @param arr Initial array
   * @returns New, zipped array
   */
  all: zipAllWith_,
})

export { zipWith_ }
export default zipWith_
