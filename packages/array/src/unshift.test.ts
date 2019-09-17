import unshift from './unshift'

describe('Array unshift', () => {
  it('returns array with additional element at the beginning', () => {
    const arr = [2, 3, 4]
    const result = unshift(1)(arr)
    const expected = [1, 2, 3, 4]

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = [2]
    const result = unshift(1)(arr)

    expect(result).not.toBe(arr)
  })
})
