import flat from './flat'

describe('Array flat', () => {
  it('provides functional wrapper for Array.prototype.flat - default depth', () => {
    const arr = [[1, 2], [3, 4]]

    const result = flat()(arr)
    const expected = arr.flat()

    expect(result).toEqual(expected)
  })

  it('provides functional wrapper for Array.prototype.flat - custom depth', () => {
    const arr = [[[1, 2], [3, 4]]]
    const depth = 2

    const result = flat(depth)(arr)
    const expected = arr.flat(depth)

    expect(result).toEqual(expected)
  })
})
