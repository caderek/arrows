type ZippingFn = (a: any, b: any) => any
type ZipWith = (fn: ZippingFn) => (otherArr: any[]) => (arr: any[]) => any[]

/**
 * Zips two arrays creating an array containing values
 * created by running provided function on values pairs at corresponding indexes.
 * Zips until the length of the shorter array is reached.
 */
const _zipWith: ZipWith = (fn) => (otherArr) => (arr) => {
  const length = Math.min(arr.length, otherArr.length)
  const newArr = []

  for (let i = 0; i < length; i++) {
    const value = fn(arr[i], otherArr[i])
    newArr.push(value)
  }

  return newArr
}

export default _zipWith
