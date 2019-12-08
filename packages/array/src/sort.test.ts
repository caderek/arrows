import { sort } from "./index"

describe("Array sort", () => {
  it("provides functional wrapper for Array.prototype.sort", () => {
    const arr = [1, 3, 2]
    const comparator = (a, b) => a - b

    const result = sort(comparator, arr)
    const result2 = sort(comparator)(arr)

    const expected = [...arr].sort(comparator)

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("always returns a new array", () => {
    const arr = []
    const comparator = (a, b) => a - b

    const result = sort(comparator)(arr)

    expect(result).not.toBe(arr)
  })

  it("provides a method for numerical sort", () => {
    const arr = [1, 3, 2, 5, 4]

    const result = sort.num(arr)
    const expected = [1, 2, 3, 4, 5]

    expect(result).toEqual(expected)
  })

  it("provides a method for numerical sort - descending", () => {
    const arr = [1, 3, 2, 5, 4]

    const result = sort.numDesc(arr)
    const expected = [5, 4, 3, 2, 1]

    expect(result).toEqual(expected)
  })

  it("provides a method for alphabetical sort", () => {
    const arr = ["foo", "zoo", "bar", "zoo", "baz"]

    const result = sort.str(arr)
    const expected = ["bar", "baz", "foo", "zoo", "zoo"]

    expect(result).toEqual(expected)
  })

  it("provides a method for alphabetical sort - descending", () => {
    const arr = ["foo", "zoo", "bar", "zoo", "baz"]

    const result = sort.strDesc(arr)
    const expected = ["zoo", "zoo", "foo", "baz", "bar"]

    expect(result).toEqual(expected)
  })

  it("provides a method for locale alphabetical sort", () => {
    const arr = ["foo", "bar", "zoo", "baz"]

    const result = sort.locale(arr)
    const expected = ["bar", "baz", "foo", "zoo"]

    expect(result).toEqual(expected)
  })

  it("provides a method for locale alphabetical sort - descending", () => {
    const arr = ["foo", "bar", "zoo", "baz"]

    const result = sort.localeDesc(arr)
    const expected = ["zoo", "foo", "baz", "bar"]

    expect(result).toEqual(expected)
  })
})
