import { zipWith_ } from './index'

describe('Array zipAll', () => {
  it('returns correct pairs for arrays with equal length', () => {
    const arr = [1, 2, 3]
    const otherArr = [3, 4, 5]
    const zippingFn = (a, b) => a + b

    const result = zipWith_(zippingFn)(otherArr)(arr)
    const expected = [4, 6, 8]

    expect(result).toEqual(expected)
  })

  it('returns correct pairs for when base array is shorter', () => {
    const arr = [1, 2]
    const otherArr = [3, 4, 5]
    const zippingFn = (a, b) => a + b

    const result = zipWith_(zippingFn)(otherArr)(arr)
    const expected = [4, 6]
    expect(result).toEqual(expected)
  })

  it('returns correct pairs for when base array is longer', () => {
    const arr = [1, 2, 3]
    const otherArr = [3, 4]
    const zippingFn = (a, b) => a + b

    const result = zipWith_(zippingFn)(otherArr)(arr)
    const expected = [4, 6]

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = []
    const otherArr = []
    const zippingFn = (a, b) => a + b

    const result = zipWith_(zippingFn)(otherArr)(arr)

    expect(result).not.toBe(arr)
  })
})
