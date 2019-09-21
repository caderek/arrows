type ZipAll = (otherArr: any[]) => (arr: any[]) => any[][]

/**
 * Zips two arrays creating an array of pairs
 * containing values on corresponding indexes.
 * Zips until the length of the longer array is reached.
 */
const _zipAll: ZipAll = (otherArr) => (arr) => {
  const length = Math.max(arr.length, otherArr.length)
  const newArr = []

  for (let i = 0; i < length; i++) {
    newArr.push([arr[i], otherArr[i]])
  }

  return newArr
}

export { _zipAll }
export default _zipAll
