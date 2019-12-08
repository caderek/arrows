import { size_ } from "./index"

describe("Array size", () => {
  it("provides functional wrapper for array.length", () => {
    const arr = [1, 2, 3]

    const result = size_(arr)
    const expected = arr.length

    expect(result).toEqual(expected)
  })
})
