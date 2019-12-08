import { set_ } from "./index"

describe("Array set", () => {
  it("returns array with new value on provided index", () => {
    const arr = [1, 2, 3]
    const value = 4
    const index = 1

    const result = set_(value, index, arr)
    const result2 = set_(value, index)(arr)
    const result3 = set_(value)(index, arr)
    const result4 = set_(value)(index)(arr)

    const expected = [1, 4, 3]

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it("always returns a new array", () => {
    const arr = ["foo"]
    const value = "bar"
    const index = 0

    const result = set_(value, index)(arr)

    expect(result).not.toBe(arr)
  })

  it("throws when an  index is out of bound of the array", () => {
    const arr = ["foo"]
    const value = "bar"
    const index = 10

    const call = () => set_(value, index, arr)

    expect(call).toThrowError(
      "The provided index is out of bound of the array.",
    )
  })
})
