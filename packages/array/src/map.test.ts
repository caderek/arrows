import { map } from './index'

describe('Array map', () => {
  it('provides functional wrapper for Array.prototype.map', () => {
    const arr = [1, 2, 3]
    const mappingFn = (x) => x + 1

    const result = map(mappingFn, arr)
    const result2 = map(mappingFn)(arr)

    const expected = arr.map(mappingFn)

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
