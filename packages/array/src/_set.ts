const _set = (index, value) => (arr) => {
  const newArr = [...arr]
  newArr[index] = value
  return newArr
}

export default _set
