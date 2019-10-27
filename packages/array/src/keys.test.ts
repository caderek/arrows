import { keys } from './index'

describe('Array keys', () => {
  it('provides functional wrapper for Array.prototype.keys', () => {
    const arr = ['one', 'two', 'three']

    const result = keys(arr)
    const expected = arr.keys()

    expect(result).toEqual(expected)
  })
})
