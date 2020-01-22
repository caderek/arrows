import { chunk_ } from "./index"

describe("Array chunk_", () => {
  it("returns the array of equal size chunks", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const result = chunk_(3, arr)
    const result2 = chunk_(3)(arr)

    const expected = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("if the array can't be split into equal size chunks, last chunk contains the remaining part", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8]

    const result = chunk_(3, arr)
    const result2 = chunk_(3)(arr)

    const expected = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8],
    ]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("always returns a new array", () => {
    const arr = []

    const result = chunk_(2, arr)
    const result2 = chunk_(2)(arr)

    expect(result).toEqual(result2)
    expect(result).not.toBe(arr)
  })

  it("throws when chunk size is not > 0", () => {
    const arr = [1, 2]

    const test = () => chunk_(0, arr)

    expect(test).toThrowError("Chunk size has to be greater than 0.")
  })
})
