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

type _Set_ = <T>(index: number, value: T, arr: T[]) => T[]

type Set_ = _Set_ & Curry3

const _set_: _Set_ = (index, value, arr) => {
  if (index > arr.length - 1) {
    throw new Error('The provided index is out of bound of the array.')
  }

  const newArr = [...arr]
  newArr[index] = value
  return newArr
}

/**
 * Creates a new array with a new value at the provided index.
 * If the index is out of bound of the array throws an error.
 *
 * @param index Specific index
 * @param value New value
 * @param arr Initial array
 * @returns New array
 */
const set_: Set_ = curry(_set_)

export { set_ }
export default set_
