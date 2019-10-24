import curry from '@arrows/composition/curry'

type UpdaterFn<T> = (value: T) => T

type Curry1<T> = (arr: T[]) => T[]

type Curry2<T> = {
  (index: number): Curry1<T>
  (index: number, arr: T[]): T[]
}

type Curry3 = {
  <T>(updaterFn: UpdaterFn<T>): Curry2<T>
  <T>(reducingFn: UpdaterFn<T>, index: number): Curry1<T>
}

type _Update_ = <T>(updaterFn: UpdaterFn<T>, index: number, arr: T[]) => T[]

type Update_ = _Update_ & Curry3

const _update_: _Update_ = (updaterFn, index, arr) => {
  if (index > arr.length - 1) {
    throw new Error('The provided index is out of bound of the array.')
  }

  const newArr = [...arr]
  newArr[index] = updaterFn(newArr[index])
  return newArr
}

/**
 * Creates a new array with a new value at the provided index,
 * calculated by updater function that maps an old value into a new one.
 *
 * If the index is out of bound of the array throws an error.
 *
 * @param value New value
 * @param index Specific index
 * @param arr Initial array
 * @returns New array
 */
const update_: Update_ = curry(_update_)

export { update_ }
export default update_
