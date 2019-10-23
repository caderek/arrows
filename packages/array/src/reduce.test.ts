import { reduce } from './index'

describe('Array reduce', () => {
  it('provides functional wrapper for Array.prototype.reduce', () => {
    const arr = [1, 2, 3]
    const reducingFn = (acc, value) => acc + value
    const initialValue = 0

    const result = reduce(reducingFn, initialValue, arr)
    const result2 = reduce(reducingFn)(initialValue, arr)
    const result3 = reduce(reducingFn, initialValue)(arr)
    const result4 = reduce(reducingFn)(initialValue)(arr)

    const expected = arr.reduce(reducingFn, initialValue)

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })
})
