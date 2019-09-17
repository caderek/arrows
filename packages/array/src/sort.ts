type Comparator = (a: any, b: any) => number
type Sort = (fn?: Comparator) => (arr: any[]) => any[]

const sort: Sort = (fn) => (arr) => [...arr].sort(fn)

export default sort
