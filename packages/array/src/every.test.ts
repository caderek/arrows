import { every } from "./index"

describe("Array every", () => {
  it("provides functional wrapper for Array.prototype.every - true", () => {
    const arr = [1, 2, 3]
    const testFn = (x) => x > 0

    const result = every(testFn, arr)
    const result2 = every(testFn)(arr)

    const expected = arr.every(testFn)

    expect(result).toBe(true)
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("provides functional wrapper for Array.prototype.every - false", () => {
    const arr = [1, 2, 3]
    const testFn = (x) => x > 1

    const result = every(testFn, arr)
    const result2 = every(testFn)(arr)

    const expected = arr.every(testFn)

    expect(result).toBe(false)
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
