import first from './first'

describe('Array first', () => {
  it('returns first element of the array', () => {
    const arr = [1, 2, 3, 4]

    const result = first(arr)
    const expected = 1

    expect(result).toEqual(expected)
  })

  it('returns undefined if array is empty', () => {
    const arr = []

    const result = first(arr)
    const expected = undefined

    expect(result).toEqual(expected)
  })
})
