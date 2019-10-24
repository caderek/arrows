type ZippingFn<T, V> = (a: T, b: T) => V
type ZipWith = <T, V>(
  fn: ZippingFn<T, V>,
) => (otherArr: T[]) => (arr: T[]) => V[]

/**
 * Zips two arrays creating an array containing values
 * created by running provided function on values pairs at corresponding indexes.
 * Zips until the length of the shorter array is reached.
 */
const zipWith_: ZipWith = (fn) => (otherArr) => (arr) => {
  const length = Math.min(arr.length, otherArr.length)
  const newArr = []

  for (let i = 0; i < length; i++) {
    const value = fn(arr[i], otherArr[i])
    newArr.push(value)
  }

  return newArr
}

export { zipWith_ }
export default zipWith_
