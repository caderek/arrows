import _clear from './_clear'

describe('Array clearX', () => {
  it('always returns a new, empty array', () => {
    const arr = [1]

    const result = _clear(arr)
    const expected = []

    expect(result).toEqual(expected)
  })
})
