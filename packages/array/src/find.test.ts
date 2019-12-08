import { find } from "./index"

describe("Array find", () => {
  it("provides functional wrapper for Array.prototype.find", () => {
    const arr = [1, 2, 3]
    const testFn = (x) => x > 2

    const result = find(testFn, arr)
    const result2 = find(testFn)(arr)

    const expected = arr.find(testFn)

    expect(result).toEqual(3)
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
