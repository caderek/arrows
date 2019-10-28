import { slice } from './index'

describe('Array slice', () => {
  it('provides functional wrapper for Array.prototype.slice', () => {
    const arr = [1, 2, 3, 4, 5]
    const from = 2
    const to = 4

    const result = slice(from, to, arr)
    const result2 = slice(from)(to, arr)
    const result3 = slice(from, to)(arr)
    const result4 = slice(from)(to)(arr)

    const expected = arr.slice(from, to)

    expect(result).toEqual([3, 4])
    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it('provides a method with default end', () => {
    const arr = [1, 2, 3, 4, 5]
    const from = 2

    const result = slice.from(from, arr)
    const result2 = slice.from(from)(arr)

    const expected = arr.slice(from)

    expect(result).toEqual([3, 4, 5])
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it('provides a method with default end', () => {
    const arr = [1, 2, 3, 4, 5]
    const to = 4

    const result = slice.to(to, arr)
    const result2 = slice.to(to)(arr)

    const expected = arr.slice(0, to)

    expect(result).toEqual([1, 2, 3, 4])
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
