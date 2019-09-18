type ValueMapper = (element: any) => any
type Comparator = (a: any, b: any) => number
type SortBy = (
  valueMapper: ValueMapper,
) => (comparator?: Comparator) => (arr: any[]) => any[]

const defaultComparator: Comparator = (a, b) => (a > b ? 1 : -1)

const _sortBy: SortBy = (valueMapper) => (comparator = defaultComparator) => (
  arr,
) => {
  return [...arr].sort((a, b) => comparator(valueMapper(a), valueMapper(b)))
}

export default _sortBy
