import { filter } from './index'

describe('Array filter', () => {
  it('provides functional wrapper for Array.prototype.filter', () => {
    const arr = [1, 2, 3]
    const filteringFn = (x) => x === 1

    const result = filter(filteringFn, arr)
    const result2 = filter(filteringFn)(arr)

    const expected = arr.filter(filteringFn)

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
