import { last_ } from "./index"

describe("Array last", () => {
  it("returns last element of the array", () => {
    const arr = [1, 2, 3, 4]

    const result = last_(arr)
    const expected = 4

    expect(result).toEqual(expected)
  })

  it("returns undefined if array is empty", () => {
    const arr = []

    const result = last_(arr)
    const expected = undefined

    expect(result).toEqual(expected)
  })
})
