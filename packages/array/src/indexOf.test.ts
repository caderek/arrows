import { indexOf } from './index'

describe('Array indexOf', () => {
  it('provides functional wrapper for Array.prototype.indexOf', () => {
    const arr = [4, 1, 2, 3, 4, 5]
    const element = 4
    const fromIndex = 2

    const result = indexOf(element, fromIndex, arr)
    const result2 = indexOf(element)(fromIndex, arr)
    const result3 = indexOf(element, fromIndex)(arr)
    const result4 = indexOf(element)(fromIndex)(arr)

    const expected = arr.indexOf(element, fromIndex)

    expect(result).toEqual(4)
    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it('provides functional wrapper for Array.prototype.indexOf - .all method', () => {
    const arr = [4, 1, 2, 3, 4, 5]
    const element = 4

    const result = indexOf.all(element, arr)
    const result2 = indexOf.all(element)(arr)

    const expected = arr.indexOf(element)

    expect(result).toEqual(0)
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
