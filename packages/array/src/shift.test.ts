import shift from './shift'

describe('Array shift', () => {
  it('returns an array without the last element', () => {
    const arr = [1, 2, 3]
    const result = shift(arr)
    const expected = [2, 3]

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = [1]
    const result = shift(arr)

    expect(result).not.toBe(arr)
  })
})
