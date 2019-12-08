import { append_ } from "./index"

describe("Array append", () => {
  it("returns array with additional element at the end", () => {
    const arr = [1, 2, 3]

    const result = append_(4, arr)
    const result2 = append_(4)(arr)

    const expected = [1, 2, 3, 4]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("always returns a new array", () => {
    const arr = [1]

    const result = append_(2, arr)

    expect(result).not.toBe(arr)
  })
})
