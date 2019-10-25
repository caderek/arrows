import curry from '@arrows/composition/curry'

type CurryFill1<T, V> = (arr: T[]) => (T | V)[]

type CurryFill2<T, V> = {
  (value: V): CurryFill1<T, V>
  (value: V, arr: (T | V)[]): (T | V)[]
}

type CurryFill3<T, V> = {
  (endIndex: number | undefined): CurryFill2<T, V>
  (endIndex: number | undefined, value: V): CurryFill1<T, V>
  (endIndex: number | undefined, value: V, arr: (T | V)[]): (T | V)[]
}

type CurryFill4 = {
  <T, V>(startIndex: number | undefined): CurryFill3<T, V>
  <T, V>(
    startIndex: number | undefined,
    endIndex: number | undefined,
  ): CurryFill2<T, V>
  <T, V>(
    startIndex: number | undefined,
    endIndex: number | undefined,
    value: V,
  ): CurryFill1<T, V>
}

type _Fill = <T, V>(
  startIndex: number | undefined,
  endIndex: number | undefined,
  value: V,
  arr: (T | V)[],
) => (T | V)[]

type CurriedFill = _Fill & CurryFill4

type FillAll = {
  <T, V>(value: V, arr: T[]): V[]
  <T, V>(value: V): (arr: T[]) => V[]
}

type FillEnd = {
  <T, V>(endIndex: number, value: V, arr: (T | V)[]): (T | V)[]
  <T, V>(endIndex: number, value: V): CurryFill1<T, V>
  <T, V>(endIndex: number): CurryFill2<T, V>
}

type CurriedFillStart = {
  <T, V>(startIndex: number, value: V): CurryFill1<T, V>
  <T, V>(startIndex: number): CurryFill2<T, V>
}

type _FillStart = <T, V>(
  startIndex: number,
  value: V,
  arr: (T | V)[],
) => (T | V)[]

type FillStart = _FillStart & CurriedFillStart

type Fill = CurriedFill & {
  all: FillAll
  end: FillEnd
  start: FillStart
}

const _fill: _Fill = (startIndex, endIndex, value, arr) => {
  return [...arr].fill(value, startIndex, endIndex)
}

const _fillStart: _FillStart = (startIndex, value, arr) =>
  _fill(startIndex, undefined, value, arr)

const fillStart: FillStart = curry(_fillStart)

const curriedFill: CurriedFill = curry(_fill)

/**
 * Creates a new array with section identified by start and end index
 * filled with provided value.
 * Have built-in methods for common cases.
 *
 * @param startIndex Start index (if undefined - fill from start)
 * @param endIndex End index (if undefined - fill to the end)
 * @param value Value with which selected section will be filled.
 * @param arr Initial array
 * @returns New array
 *
 * @property {Function} all Fill from the start to the end
 * @property {Function} end Fill from the start to the specified index
 * @property {Function} start Fill from the specified index to the end
 */
const fill: Fill = Object.assign(curriedFill, {
  all: curriedFill(0, undefined),
  end: curriedFill(0),
  start: fillStart,
})

export { fill }
export default fill
