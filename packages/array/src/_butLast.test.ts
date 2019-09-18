import _butLast from './_butLast'

describe('Array _butLast', () => {
  it('returns the array without last element', () => {
    const arr = [1, 2, 3, 4]

    const result = _butLast(arr)
    const expected = [1, 2, 3]

    expect(result).toEqual(expected)
  })

  it('returns empty array if there is less than two elements', () => {
    const arr = []

    const result = _butLast(arr)
    const expected = []

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = []

    const result = _butLast(arr)

    expect(result).not.toBe(arr)
  })
})
