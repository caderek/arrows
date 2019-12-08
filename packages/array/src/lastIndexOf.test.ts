import { lastIndexOf } from "./index"

describe("Array lastIndexOf", () => {
  it("provides functional wrapper for Array.prototype.lastIndexOf", () => {
    const arr = [4, 1, 2, 3, 4, 5]
    const element = 4
    const fromIndex = -3

    const result = lastIndexOf(element, fromIndex, arr)
    const result2 = lastIndexOf(element)(fromIndex, arr)
    const result3 = lastIndexOf(element, fromIndex)(arr)
    const result4 = lastIndexOf(element)(fromIndex)(arr)

    const expected = arr.lastIndexOf(element, fromIndex)

    expect(result).toEqual(0)
    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it("provides functional wrapper for Array.prototype.lastIndexOf - .all method", () => {
    const arr = [4, 1, 2, 3, 4, 5]
    const element = 4

    const result = lastIndexOf.all(element, arr)
    const result2 = lastIndexOf.all(element)(arr)

    const expected = arr.lastIndexOf(element)

    expect(result).toEqual(4)
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
