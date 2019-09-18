import last from './last'

describe('Array last', () => {
  it('returns last element of the array', () => {
    const arr = [1, 2, 3, 4]

    const result = last(arr)
    const expected = 4

    expect(result).toEqual(expected)
  })

  it('returns undefined if array is empty', () => {
    const arr = []

    const result = last(arr)
    const expected = undefined

    expect(result).toEqual(expected)
  })
})
