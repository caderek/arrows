type GroupingFn = (x: any) => any
type GroupBy = (groupingFn: GroupingFn) => (arr: any[]) => Object

const _groupBy: GroupBy = (groupingFn) => (arr) => {
  const groups = {}

  arr.forEach((item) => {
    const key = groupingFn(item)

    if (groups[key] !== undefined) {
      groups[key].push(item)
    } else {
      groups[key] = [item]
    }
  })

  return groups
}

export default _groupBy
