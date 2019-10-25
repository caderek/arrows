import { zipAllWith_ } from './index'

describe('Array zipAllWith', () => {
  it('returns correct pairs for arrays with equal length', () => {
    const arr = [1, 2, 3]
    const otherArr = [3, 4, 5]
    const zippingFn = (a, b) => a + b

    const result = zipAllWith_(zippingFn, otherArr, arr)
    const result2 = zipAllWith_(zippingFn, otherArr)(arr)
    const result3 = zipAllWith_(zippingFn)(otherArr, arr)
    const result4 = zipAllWith_(zippingFn)(otherArr)(arr)

    const expected = [4, 6, 8]

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it('returns correct pairs for when base array is shorter', () => {
    const arr = [1, 2]
    const otherArr = [3, 4, 5]
    const zippingFn = (a = 0, b = 0) => a + b

    const result = zipAllWith_(zippingFn, otherArr, arr)
    const result2 = zipAllWith_(zippingFn, otherArr)(arr)
    const result3 = zipAllWith_(zippingFn)(otherArr, arr)
    const result4 = zipAllWith_(zippingFn)(otherArr)(arr)

    const expected = [4, 6, 5]

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it('returns correct pairs for when base array is longer', () => {
    const arr = [1, 2, 3]
    const otherArr = [3, 4]
    const zippingFn = (a = 0, b = 0) => a + b

    const result = zipAllWith_(zippingFn, otherArr, arr)
    const result2 = zipAllWith_(zippingFn, otherArr)(arr)
    const result3 = zipAllWith_(zippingFn)(otherArr, arr)
    const result4 = zipAllWith_(zippingFn)(otherArr)(arr)

    const expected = [4, 6, 3]

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = []
    const otherArr = []
    const zippingFn = (a, b) => a + b

    const result = zipAllWith_(zippingFn)(otherArr)(arr)

    expect(result).not.toBe(arr)
  })
})
