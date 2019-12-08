import { some } from "./index"

describe("Array some", () => {
  it("provides functional wrapper for Array.prototype.some - true", () => {
    const arr = [1, 2, 3]
    const testFn = (x) => x > 2

    const result = some(testFn, arr)
    const result2 = some(testFn)(arr)

    const expected = arr.some(testFn)

    expect(result).toBe(true)
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("provides functional wrapper for Array.prototype.some - false", () => {
    const arr = [1, 2, 3]
    const testFn = (x) => x > 3

    const result = some(testFn, arr)
    const result2 = some(testFn)(arr)

    const expected = arr.some(testFn)

    expect(result).toBe(false)
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
