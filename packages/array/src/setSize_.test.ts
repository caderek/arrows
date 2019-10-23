import { setSize_ } from './index'

describe('Array setSize', () => {
  it('returns trimmed array if size is lower than initial array length', () => {
    const arr = [1, 2, 3]
    const result = setSize_(2)(arr)
    const expected = [1, 2]

    expect(result).toEqual(expected)
  })

  it('returns identical array if size is equal initial array length', () => {
    const arr = [1, 2, 3]
    const result = setSize_(3)(arr)
    const expected = [1, 2, 3]

    expect(result).toEqual(expected)
  })

  it('returns array extended with undefined values if size is greater than initial array length', () => {
    const arr = [1, 2, 3]
    const result = setSize_(5)(arr)
    const expected = [1, 2, 3, undefined, undefined]

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = [1]
    const result = setSize_(1)(arr)

    expect(result).not.toBe(arr)
  })
})
