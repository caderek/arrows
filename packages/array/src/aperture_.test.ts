import { aperture_ } from "./index"

describe("Array aperture_", () => {
  it("returns the array of equal size, overlapping chunks", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]

    const result = aperture_(3, arr)
    const result2 = aperture_(3)(arr)

    const expected = [
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
      [4, 5, 6],
      [5, 6, 7],
    ]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("returns empty array if the size of the chunk exceeds the array length", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]

    const result = aperture_(8, arr)
    const result2 = aperture_(8)(arr)

    const expected = []

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("always returns a new array", () => {
    const arr = []

    const result = aperture_(2, arr)
    const result2 = aperture_(2)(arr)

    expect(result).toEqual(result2)
    expect(result).not.toBe(arr)
  })

  it("throws when chunk size is not > 0", () => {
    const arr = [1, 2]

    const test = () => aperture_(0, arr)

    expect(test).toThrowError("Chunk size has to be greater than 0.")
  })
})
