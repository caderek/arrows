import pop from './pop'

describe('Array pop', () => {
  it('returns an array without the last element', () => {
    const arr = [1, 2, 3]
    const result = pop(arr)
    const expected = [1, 2]

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = [1]
    const result = pop(arr)

    expect(result).not.toBe(arr)
  })
})
