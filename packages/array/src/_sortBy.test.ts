import _sortBy from './_sortBy'

describe('Array sortBy', () => {
  it('sorts array by values calculated by mapper function - default comparator', () => {
    const arr = [{ name: 'John' }, { name: 'Alice' }, { name: 'Bob' }]
    const mapper = (x) => x.name

    const result = _sortBy(mapper)()(arr)
    const expected = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'John' }]

    expect(result).toEqual(expected)
  })

  it('sorts array by values calculated by mapper function - custom comparator', () => {
    const arr = [2, -2, 5, -5, 1, 0]
    const mapper = (x) => Math.abs(x)
    const comparator = (a, b) => a - b

    const result = _sortBy(mapper)(comparator)(arr)
    const expected = [0, 1, 2, -2, 5, -5]

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = []
    const mapper = (x) => x
    const result = _sortBy(mapper)()(arr)

    expect(result).not.toBe(arr)
  })
})
