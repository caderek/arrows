import update from './update'

describe('Array update', () => {
  it('returns array with new value on provided index, calculated from old value', () => {
    const arr = [1, 2, 3]
    const result = update((x) => x * 2)(1)(arr)
    const expected = [1, 4, 3]

    expect(result).toEqual(expected)
  })

  it('uses provided value for calculation, if original value is not set', () => {
    const arr = [1, undefined, 3]
    const result = update((x) => x * 2)(1, 2)(arr)
    const expected = [1, 4, 3]

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = [1, 2, 3]
    const result = update((x) => x * 2)(1)(arr)

    expect(result).not.toBe(arr)
  })
})
