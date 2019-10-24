import curry from '@arrows/composition/curry'

type Curry1<T> = (arr: T[]) => T[]

type Curry2<T> = {
  (index: number): Curry1<T>
  (index: number, arr: T[]): T[]
}

type Curry3 = {
  <T>(value: T): Curry2<T>
  <T>(value: T, index: number): Curry1<T>
}

type _Insert_ = <T>(value: T, index: number, arr: T[]) => T[]

type Insert_ = _Insert_ & Curry3

const _insert_: _Insert_ = (value, index, arr) => {
  return index >= arr.length
    ? arr.concat([value])
    : arr
        .slice(0, index)
        .concat([value])
        .concat(arr.slice(index))
}

/**
 * Creates a new array with an additional value at the provided index.
 * Shifts old values to the right.
 * If the index is out of bound of the array - adds a value as a last element.
 *
 * @param value Additional value
 * @param index Specific index
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
