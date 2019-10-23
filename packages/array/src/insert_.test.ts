import { insert_ } from './index'

describe('Array insert', () => {
  it('returns array with additional element on provided index', () => {
    const arr = [1, 2, 3]

    const result = insert_(1, 4, arr)
    const result2 = insert_(1, 4)(arr)
    const result3 = insert_(1)(4, arr)
    const result4 = insert_(1)(4)(arr)

    const expected = [1, 4, 2, 3]

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it('when index is out of bound adds new element at the end', () => {
    const arr = [1, 2, 3]

    const result = insert_(10, 4, arr)
    const result2 = insert_(10, 4)(arr)
    const result3 = insert_(10)(4, arr)
    const result4 = insert_(10)(4)(arr)

    const expected = [1, 2, 3, 4]

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it('always returns a new array - regular insertion', () => {
    const arr = [1]
    const result = insert_(0, 2, arr)

    expect(result).not.toBe(arr)
  })

  it('always returns a new array - out of bound insertion', () => {
    const arr = [1]
    const result = insert_(10, 2, arr)

    expect(result).not.toBe(arr)
  })
})
