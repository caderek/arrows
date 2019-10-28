import { values } from './index'

describe('Array values', () => {
  it('provides functional wrapper for Array.prototype.values', () => {
    const arr = [1, 2, 3]

    const result = values(arr)
    const expected = arr.values()

    expect(result).toEqual(expected)
  })
})
