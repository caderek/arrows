const insert = (index, value) => (arr) => {
  return index >= arr.length
    ? arr.concat([value])
    : arr
        .slice(0, index)
        .concat([value])
        .concat(arr.slice(index))
}

export default insert
