import { fill } from './index'

describe('Array fill', () => {
  it('provides functional wrapper for Array.prototype.filter - fill all', () => {
    const arr = [1, 2, 3]
    const value = 7
    const start = 0
    const end = undefined

    const result = fill(start, end, value, arr)
    const result2 = fill(start)(end, value, arr)
    const result3 = fill(start, end)(value, arr)
    const result4 = fill(start, end, value)(arr)
    const result5 = fill(start)(end)(value, arr)
    const result6 = fill(start)(end)(value)(arr)
    const result7 = fill(start, end)(value)(arr)
    const result8 = fill(start)(end, value)(arr)

    const expected = arr.fill(value, start, end)

    expect(result).toEqual([7, 7, 7])
    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(result5)
    expect(result).toEqual(result6)
    expect(result).toEqual(result7)
    expect(result).toEqual(result8)
    expect(result).toEqual(expected)
  })

  it('provides functional wrapper for Array.prototype.filter - fill.all method', () => {
    const arr = [1, 2, 3]
    const value = 7

    const result = fill.all(value, arr)
    const result2 = fill.all(value)(arr)

    const expected = arr.fill(value)

    expect(result).toEqual([7, 7, 7])
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it('provides functional wrapper for Array.prototype.filter - fill end', () => {
    const arr = [1, 2, 3]
    const value = 7
    const start = 0
    const end = 2

    const result = fill(start, end, value, arr)
    const result2 = fill(start)(end, value, arr)
    const result3 = fill(start, end)(value, arr)
    const result4 = fill(start, end, value)(arr)
    const result5 = fill(start)(end)(value, arr)
    const result6 = fill(start)(end)(value)(arr)
    const result7 = fill(start, end)(value)(arr)
    const result8 = fill(start)(end, value)(arr)

    const expected = arr.fill(value, start, end)

    expect(result).toEqual([7, 7, 3])
    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(result5)
    expect(result).toEqual(result6)
    expect(result).toEqual(result7)
    expect(result).toEqual(result8)
    expect(result).toEqual(expected)
  })

  it('provides functional wrapper for Array.prototype.filter - fill.end method', () => {
    const arr = [1, 2, 3]
    const value = 7
    const start = 0
    const end = 2

    const result = fill.end(end, value, arr)
    const result2 = fill.end(end)(value, arr)
    const result3 = fill.end(end, value)(arr)
    const result4 = fill.end(end)(value)(arr)

    const expected = arr.fill(value, start, end)

    expect(result).toEqual([7, 7, 3])
    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it('provides functional wrapper for Array.prototype.filter - fill start', () => {
    const arr = [1, 2, 3]
    const value = 7
    const start = 1
    const end = undefined

    const result = fill(start, end, value, arr)
    const result2 = fill(start)(end, value, arr)
    const result3 = fill(start, end)(value, arr)
    const result4 = fill(start, end, value)(arr)
    const result5 = fill(start)(end)(value, arr)
    const result6 = fill(start)(end)(value)(arr)
    const result7 = fill(start, end)(value)(arr)
    const result8 = fill(start)(end, value)(arr)

    const expected = arr.fill(value, start, end)

    expect(result).toEqual([1, 7, 7])
    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(result5)
    expect(result).toEqual(result6)
    expect(result).toEqual(result7)
    expect(result).toEqual(result8)
    expect(result).toEqual(expected)
  })

  it('provides functional wrapper for Array.prototype.filter - fill.start method', () => {
    const arr = [1, 2, 3]
    const value = 7
    const start = 1
    const end = undefined

    const result = fill.start(start, value, arr)
    const result2 = fill.start(start)(value, arr)
    const result3 = fill.start(start, value)(arr)
    const result4 = fill.start(start)(value)(arr)

    const expected = arr.fill(value, start, end)

    expect(result).toEqual([1, 7, 7])
    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it('provides functional wrapper for Array.prototype.filter - custom fill', () => {
    const arr = [1, 2, 3]
    const value = 7
    const start = 1
    const end = 2

    const result = fill(start, end, value, arr)
    const result2 = fill(start)(end, value, arr)
    const result3 = fill(start, end)(value, arr)
    const result4 = fill(start, end, value)(arr)
    const result5 = fill(start)(end)(value, arr)
    const result6 = fill(start)(end)(value)(arr)
    const result7 = fill(start, end)(value)(arr)
    const result8 = fill(start)(end, value)(arr)

    const expected = arr.fill(value, start, end)

    expect(result).toEqual([1, 7, 3])
    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(result5)
    expect(result).toEqual(result6)
    expect(result).toEqual(result7)
    expect(result).toEqual(result8)
    expect(result).toEqual(expected)
  })
})
