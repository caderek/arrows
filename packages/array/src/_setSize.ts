const _setSize = (size) => (arr) => {
  return size <= arr.length
    ? arr.slice(0, size)
    : arr.slice(0).concat(Array.from({ length: size - arr.length }))
}

export { _setSize }
export default _setSize
