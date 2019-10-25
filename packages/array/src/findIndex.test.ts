import { findIndex } from './index'

describe('Array findIndex', () => {
  it('provides functional wrapper for Array.prototype.findIndex', () => {
    const arr = [1, 2, 3]
    const testFn = (x) => x > 2

    const result = findIndex(testFn, arr)
    const result2 = findIndex(testFn)(arr)

    const expected = arr.findIndex(testFn)

    expect(result).toEqual(2)
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
