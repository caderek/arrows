import { remove_ } from "./index"

describe("Array remove", () => {
  it("returns array without element on provided index - first index", () => {
    const arr = [1, 2, 3]

    const result = remove_(0, arr)
    const result2 = remove_(0)(arr)

    const expected = [2, 3]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("returns array without element on provided index - middle index", () => {
    const arr = [1, 2, 3]

    const result = remove_(1, arr)
    const result2 = remove_(1)(arr)

    const expected = [1, 3]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("returns array without element on provided index - last index", () => {
    const arr = [1, 2, 3]

    const result = remove_(2, arr)
    const result2 = remove_(2)(arr)

    const expected = [1, 2]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("returns copy of the array if index is out of bound", () => {
    const arr = [1, 2, 3]

    const result = remove_(10, arr)
    const result2 = remove_(10)(arr)

    const expected = [1, 2, 3]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("always returns a new array", () => {
    const arr = [1]

    const result = remove_(0, arr)
    const result2 = remove_(0)(arr)

    expect(result).toEqual(result2)
    expect(result).not.toBe(arr)
  })
})
