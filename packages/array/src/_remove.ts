const _remove = (index) => (arr) =>
  arr.slice(0, index).concat(arr.slice(index + 1))

export default _remove
