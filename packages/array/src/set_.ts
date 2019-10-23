const set_ = (index, value) => (arr) => {
  const newArr = [...arr]
  newArr[index] = value
  return newArr
}

export { set_ }
export default set_
