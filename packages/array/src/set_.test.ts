import { set_ } from './index'

describe('Array set', () => {
  it('returns array with new value on provided index', () => {
    const arr = [1, 2, 3]

    const result = set_(1, 4, arr)
    const result2 = set_(1, 4)(arr)
    const result3 = set_(1)(4, arr)
    const result4 = set_(1)(4)(arr)

    const expected = [1, 4, 3]

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = []
    const result = set_(0, 'foo')(arr)

    expect(result).not.toBe(arr)
  })
})
