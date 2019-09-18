import _first from './_first'

describe('Array firstX', () => {
  it('returns first element of the array', () => {
    const arr = [1, 2, 3, 4]

    const result = _first(arr)
    const expected = 1

    expect(result).toEqual(expected)
  })

  it('returns undefined if array is empty', () => {
    const arr = []

    const result = _first(arr)
    const expected = undefined

    expect(result).toEqual(expected)
  })
})
