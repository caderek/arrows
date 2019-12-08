import { range_ } from "./index"

describe("Array range", () => {
  it("returns an empty array of from equals to", () => {
    const from = 0
    const to = 0

    const result = range_(from, to)

    const expected = []

    expect(result).toEqual(expected)
  })

  it("throws an error is step is not a positive integer", () => {
    const from = 0
    const to = 10
    const step = -2

    const call = () => range_(from, to, step)

    expect(call).toThrowError("Step must be greater than zero.")
  })

  it("creates an array of positive integers", () => {
    const from = 0
    const to = 10

    const result = range_(from, to)

    const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    expect(result).toEqual(expected)
  })

  it("creates an array of positive integers - custom step and start", () => {
    const from = 5
    const to = 20
    const step = 3

    const result = range_(from, to, step)

    const expected = [5, 8, 11, 14, 17]

    expect(result).toEqual(expected)
  })

  it("creates an array of negative integers", () => {
    const from = 0
    const to = -10

    const result = range_(from, to)

    const expected = [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]

    expect(result).toEqual(expected)
  })

  it("creates an array of negative integers - custom step and start", () => {
    const from = -5
    const to = -20
    const step = 3

    const result = range_(from, to, step)

    const expected = [-5, -8, -11, -14, -17]

    expect(result).toEqual(expected)
  })

  it("creates an array of mixed integers - ascending", () => {
    const from = -10
    const to = 10
    const step = 3

    const result = range_(from, to, step)

    const expected = [-10, -7, -4, -1, 2, 5, 8]

    expect(result).toEqual(expected)
  })

  it("creates an array of mixed integers - descending", () => {
    const from = 10
    const to = -10
    const step = 3

    const result = range_(from, to, step)

    const expected = [10, 7, 4, 1, -2, -5, -8]

    expect(result).toEqual(expected)
  })

  it("works for fractions - ascending", () => {
    const from = -1.5
    const to = 1.5
    const step = 0.5

    const result = range_(from, to, step)

    const expected = [-1.5, -1, -0.5, 0, 0.5, 1.0]

    expect(result).toEqual(expected)
  })

  it("works for fractions - descending", () => {
    const from = 1.5
    const to = -1.5
    const step = 0.5

    const result = range_(from, to, step)

    const expected = [1.5, 1, 0.5, 0, -0.5, -1.0]

    expect(result).toEqual(expected)
  })
})
