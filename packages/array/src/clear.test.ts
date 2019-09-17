import clear from './clear'

describe('Array clear', () => {
  it('always returns a new, empty array', () => {
    const arr = [1]

    const result = clear(arr)
    const expected = []

    expect(result).toEqual(expected)
  })
})
