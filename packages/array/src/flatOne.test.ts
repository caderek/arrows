import { flatOne } from './index'

describe('Array flat', () => {
  it('provides functional wrapper for Array.prototype.flat - default depth (1)', () => {
    const arr = [[1, 2], [3, 4]]

    const result = flatOne(arr)
    // @ts-ignore
    const expected = arr.flat()

    expect(result).toEqual(expected)
  })
})
