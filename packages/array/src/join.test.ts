import { join } from "./index"

describe("Array join", () => {
  it("provides functional wrapper for Array.prototype.join", () => {
    const arr = ["one", "two", "three"]
    const separator = ":"

    const result = join(separator, arr)
    const result2 = join(separator)(arr)

    const expected = arr.join(separator)

    expect(result).toEqual("one:two:three")
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
