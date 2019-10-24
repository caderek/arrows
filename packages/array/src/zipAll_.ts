type ZipAll = <T>(otherArr: T[]) => (arr: T[]) => T[][]

/**
 * Zips two arrays creating an array of pairs
 * containing values on corresponding indexes.
 * Zips until the length of the longer array is reached.
 */
const zipAll_: ZipAll = (otherArr) => (arr) => {
  const length = Math.max(arr.length, otherArr.length)
  const newArr = []

  for (let i = 0; i < length; i++) {
    newArr.push([arr[i], otherArr[i]])
  }

  return newArr
}

export { zipAll_ }
export default zipAll_
