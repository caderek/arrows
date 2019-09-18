type FilteringFn = (element: any, index: number, array: any[]) => boolean
type FilterNot = (fn: FilteringFn) => (arr: any[]) => any[]

const filterNot: FilterNot = (fn) => (arr) =>
  arr.filter((element, index, array) => !fn(element, index, array))

export default filterNot
