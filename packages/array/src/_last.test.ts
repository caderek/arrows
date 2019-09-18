import _last from './_last'

describe('Array last', () => {
  it('returns last element of the array', () => {
    const arr = [1, 2, 3, 4]

    const result = _last(arr)
    const expected = 4

    expect(result).toEqual(expected)
  })

  it('returns undefined if array is empty', () => {
    const arr = []

    const result = _last(arr)
    const expected = undefined

    expect(result).toEqual(expected)
  })
})
