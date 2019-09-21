type FilteringFn = (element: any, index: number, array: any[]) => boolean
type Filter = (fn: FilteringFn) => (arr: any[]) => any[]

const filter: Filter = (fn) => (arr) => arr.filter(fn)

export { filter }
export default filter
