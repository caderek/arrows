import { clear_ } from "./index"

describe("Array clearX", () => {
  it("always returns a new, empty array", () => {
    const arr = [1]

    const result = clear_(arr)
    const expected = []

    expect(result).toEqual(expected)
  })
})
