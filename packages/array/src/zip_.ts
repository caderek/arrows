import curry from '@arrows/composition/curry'

type _Zip_ = <T, V>(otherArr: V[], arr: T[]) => [T, V][]
type _Zip2_ = <T, V>(otherArr: V[]) => (arr: T[]) => [T, V][]
type Zip_ = _Zip_ & _Zip2_

const _zip_: _Zip_ = (otherArr, arr) => {
  const length = Math.min(arr.length, otherArr.length)
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
 * Zips until the length of the shorter array is reached.
 *
 * @param otherArr Array that you want to zip with initial array
 * @param arr Initial array
 * @returns New, zipped array
 */
const zip_: Zip_ = curry(_zip_)

export { zip_ }
export default zip_
