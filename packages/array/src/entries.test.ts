import { entries } from './index'

describe('Array entries', () => {
  it('provides functional wrapper for Array.prototype.entries', () => {
    const arr = [1, 2, 3]

    const result = entries(arr)
    const expected = arr.entries()

    expect(result).toEqual(expected)
  })
})
