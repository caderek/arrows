import curry from '@arrows/composition/curry'

type GroupingFn<V> = (x: V) => string

type _GroupBy_ = <T extends object>(
  groupingFn: GroupingFn<T>,
  arr: T[],
) => { [key: string]: T[] }

type _GroupBy2_ = <T extends object>(
  groupingFn: GroupingFn<T>,
) => (arr: T[]) => { [key: string]: T[] }

type GroupBy_ = _GroupBy_ & _GroupBy2_

const _groupBy_: _GroupBy_ = (groupingFn, arr) => {
  const groups: { [key: string]: any[] } = {}

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

/**
 * Creates an object that groups array items
 * by field specified by grouping functions.
 *
 * @param groupingFn Grouping function
 * @param arr Initial array of objects
 * @returns New array
 */
const groupBy_: GroupBy_ = curry(_groupBy_)

export { groupBy_ }
export default groupBy_
