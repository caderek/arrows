type Insert = (index: number, value: any) => (arr: any[]) => any[]

const _insert: Insert = (index, value) => (arr) => {
  return index >= arr.length
    ? arr.concat([value])
    : arr
        .slice(0, index)
        .concat([value])
        .concat(arr.slice(index))
}

export { _insert }
export default _insert
