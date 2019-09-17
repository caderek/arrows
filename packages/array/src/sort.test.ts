import sort from './sort'

describe('Array sort', () => {
  it('provides functional wrapper for Array.prototype.map', () => {
    const arr = [1, 2, 3]
    const comparator = (a, b) => a - b

    const result = sort(comparator)(arr)
    const expected = [...arr].sort(comparator)

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = []
    const result = sort()(arr)

    expect(result).not.toBe(arr)
  })
})
