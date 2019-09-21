type FilteringFn = (element: any, index: number, array: any[]) => boolean
type FilterNot = (fn: FilteringFn) => (arr: any[]) => any[]

const _filterNot: FilterNot = (fn) => (arr) =>
  arr.filter((element, index, array) => !fn(element, index, array))

export { _filterNot }
export default _filterNot
