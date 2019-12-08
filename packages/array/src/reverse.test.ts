import { reverse } from "./index"

describe("Array reverse", () => {
  it("provides functional wrapper for Array.prototype.reverse", () => {
    const arr = [1, 2, 3]

    const result = reverse(arr)
    const expected = arr.reverse()

    expect(result).toEqual(expected)
  })

  it("always returns a new array", () => {
    const arr = [1]

    const result = reverse(arr)

    expect(result).not.toBe(arr)
  })
})
