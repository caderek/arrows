import set from './set'

describe('Array set', () => {
  it('returns array with new value on provided index', () => {
    const arr = [1, 2, 3]
    const result = set(1, 4)(arr)
    const expected = [1, 4, 3]

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = []
    const result = set(0, 'foo')(arr)

    expect(result).not.toBe(arr)
  })
})
