type ValueMapper = (element: T) => T
type Comparator = (a: T, b: T) => number
type SortBy = (
  valueMapper: ValueMapper,
) => (comparator?: Comparator) => (arr: T[]) => T[]

const defaultComparator: Comparator = (a, b) => (a > b ? 1 : -1)

const sortBy_: SortBy = (valueMapper) => (comparator = defaultComparator) => (
  arr,
) => {
  return [...arr].sort((a, b) => comparator(valueMapper(a), valueMapper(b)))
}

export { sortBy_ }
export default sortBy_
