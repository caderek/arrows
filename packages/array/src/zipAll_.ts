import curry from '@arrows/composition/curry'

type Pairs<T, V> = [(T | undefined), (V | undefined)][]
type _ZipAll_ = <T, V>(otherArr: V[], arr: T[]) => Pairs<T, V>
type _ZipAll2_ = <T, V>(otherArr: V[]) => (arr: T[]) => Pairs<T, V>
type ZipAll_ = _ZipAll_ & _ZipAll2_

const _zipAll_: _ZipAll_ = (otherArr, arr) => {
  const length = Math.max(arr.length, otherArr.length)
  const newArr = []

  for (let i = 0; i < length; i++) {
    const item = [arr[i], otherArr[i]] as [any, any]
    newArr.push(item)
  }

  return newArr
}

/**
 * Zips two arrays creating an array of pairs
 * containing values on corresponding indexes.
 * Zips until the length of the longer array is reached.
 *
 * @param otherArr Array that you want to zip with initial array
 * @param arr Initial array
 * @returns New, zipped array
 */
const zipAll_: ZipAll_ = curry(_zipAll_)

export { zipAll_ }
export default zipAll_

const a = zipAll_([1, 2], [3, 4, 4])
