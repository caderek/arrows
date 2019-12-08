import { concat } from "./index"

describe("Array concat", () => {
  it("provides functional wrapper for Array.prototype.concat - concat array", () => {
    const arr = [1, 2, 3]
    const otherArr = [4, 5]

    const result = concat(otherArr, arr)
    const result2 = concat(otherArr)(arr)

    const expected = arr.concat(otherArr)

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("provides functional wrapper for Array.prototype.concat - concat other values", () => {
    const arr = [1, 2, 3]
    const value = 4

    const result = concat(value, arr)
    const result2 = concat(value)(arr)

    const expected = arr.concat(value)

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
