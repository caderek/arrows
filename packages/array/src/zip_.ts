import curry from "@arrows/composition/curry"

type Pairs<T, V> = [T | undefined, V | undefined][]
type _ZipAll_ = <T, V>(otherArr: V[], arr: T[]) => Pairs<T, V>
type _ZipAll2_ = <T, V>(otherArr: V[]) => (arr: T[]) => Pairs<T, V>
type ZipAll_ = _ZipAll_ & _ZipAll2_

const _zipAll_: _ZipAll_ = (otherArr, arr) => {
  const length = Math.max(arr.length, otherArr.length)
  const newArr = new Array(length)

  for (let i = 0; i < length; i++) {
    newArr[i] = [arr[i], otherArr[i]] as [any, any]
  }

  return newArr
}

const zipAll_: ZipAll_ = curry(_zipAll_)

type _Zip_ = <T, V>(otherArr: V[], arr: T[]) => [T, V][]
type _Zip2_ = <T, V>(otherArr: V[]) => (arr: T[]) => [T, V][]
type CurriedZip_ = _Zip_ & _Zip2_

type Zip_ = CurriedZip_ & {
  all: ZipAll_
}

const _zip_: _Zip_ = (otherArr, arr) => {
  const length = Math.min(arr.length, otherArr.length)
  const newArr = new Array(length)

  for (let i = 0; i < length; i++) {
    newArr[i] = [arr[i], otherArr[i]] as [any, any]
  }

  return newArr
}

const curriedZip_: CurriedZip_ = curry(_zip_)

/**
 * Zips two arrays creating an array of pairs
 * containing values on corresponding indexes.
 * Zips until the length of the shorter array is reached.
 *
 * @param otherArr Array that you want to zip with initial array
 * @param arr Initial array
 * @returns New, zipped array
 *
 * @method all Zips until the length of the longer array is reached
 */
const zip_: Zip_ = Object.assign(curriedZip_, {
  /**
   * Zips until the length of the longer array is reached.
   *
   * @param otherArr Array that you want to zip with initial array
   * @param arr Initial array
   * @returns New, zipped array
   */
  all: zipAll_,
})

export { zip_ }
export default zip_
