import { toString } from './index'

describe('Array toString', () => {
  it('provides functional wrapper for Array.prototype.toString', () => {
    const arr = [1, 2, 3]

    const result = toString(arr)
    const expected = arr.toString()

    expect(result).toEqual(expected)
  })
})
