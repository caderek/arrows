type Comparator = (a: T, b: T) => number
type Sort = (fn?: Comparator) => (arr: T[]) => T[]

const sort: Sort = (fn) => (arr) => [...arr].sort(fn)

export { sort }
export default sort
