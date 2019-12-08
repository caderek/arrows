import { insert_ } from "./index"

describe("Array insert", () => {
  it("returns array with additional element on provided index", () => {
    const arr = [1, 2, 3]
    const value = 4
    const index = 1

    const result = insert_(value, index, arr)
    const result2 = insert_(value, index)(arr)
    const result3 = insert_(value)(index, arr)
    const result4 = insert_(value)(index)(arr)

    const expected = [1, 4, 2, 3]

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it("when index is out of bound adds new element at the end", () => {
    const arr = [1, 2, 3]
    const value = 4
    const index = 10

    const result = insert_(value, index, arr)
    const result2 = insert_(value, index)(arr)
    const result3 = insert_(value)(index, arr)
    const result4 = insert_(value)(index)(arr)

    const expected = [1, 2, 3, 4]

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it("always returns a new array", () => {
    const arr = [1]
    const value = 2
    const index = 0

    const result = insert_(value, index, arr)

    expect(result).not.toBe(arr)
  })
})
