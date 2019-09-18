import flatMap from './flatMap'

describe('Array flatMap', () => {
  it('provides functional wrapper for Array.prototype.flatMap', () => {
    const arr = [1, 2, 3]
    const mappingFn = (x) => [x, x + 1]

    const result = flatMap(mappingFn)(arr)
    const expected = arr.flatMap(mappingFn)

    expect(result).toEqual(expected)
  })
})
