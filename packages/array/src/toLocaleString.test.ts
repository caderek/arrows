import { toLocaleString } from "./index"

describe("Array toLocaleString", () => {
  it("provides functional wrapper for Array.prototype.toLocaleString", () => {
    const arr = [1, 2, 3]

    const result = toLocaleString(arr)
    const expected = arr.toLocaleString()

    expect(result).toEqual(expected)
  })
})
