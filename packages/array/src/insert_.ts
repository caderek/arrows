import curry from '@arrows/composition/curry'

type Curry1<T> = (arr: T[]) => T[]

type Curry2<T> = {
  (value: T): Curry1<T>
  (value: T, arr: T[]): T[]
}

type Curry3 = {
  <T>(index: number): Curry2<T>
  <T>(index: number, value: T): Curry1<T>
}

type _Insert_ = <T>(index: number, value: T, arr: T[]) => T[]

type Insert_ = _Insert_ & Curry3

const _insert_: _Insert_ = (index, value, arr) => {
  return index >= arr.length
    ? arr.concat([value])
    : arr
        .slice(0, index)
        .concat([value])
        .concat(arr.slice(index))
}

/**
 * Inserts an additional value inside an array at a provided index.
 * Shifts old values to the right.
 * If the index is out of bound of the array adds a value as a last element.
 *
 * @param index Specific index
 * @param value Additional value
 * @param arr Initial array
 * @returns New array
 */
const insert_: Insert_ = curry(_insert_)

export { insert_ }
export default insert_

insert_(0, 1, [])
insert_(0)(1)([])
insert_(0, 1)([])
insert_(0)(1, [])
