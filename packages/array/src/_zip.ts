type Zip = (otherArr: any[]) => (arr: any[]) => any[][]

/**
 * Zips two arrays creating an array of pairs
 * containing values on corresponding indexes.
 * Zips until the length of the shorter array is reached.
 */
const _zip: Zip = (otherArr) => (arr) => {
  const length = Math.min(arr.length, otherArr.length)
  const newArr = []

  for (let i = 0; i < length; i++) {
    newArr.push([arr[i], otherArr[i]])
  }

  return newArr
}

export default _zip
