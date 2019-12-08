import { update_ } from "./index"

describe("Array update", () => {
  it("returns array with new value on provided index, calculated from old value", () => {
    const arr = [1, 2, 3]
    const updaterFn = (x) => x * 2
    const index = 1

    const result = update_(updaterFn, index, arr)
    const result2 = update_(updaterFn)(index, arr)
    const result3 = update_(updaterFn, index)(arr)
    const result4 = update_(updaterFn)(index)(arr)

    const expected = [1, 4, 3]

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it("can use default value in the updater function", () => {
    const arr = [1, undefined, 3]
    const updaterFn = (x = 2) => x * 2
    const index = 1

    const result = update_(updaterFn, index, arr)
    const result2 = update_(updaterFn)(index, arr)
    const result3 = update_(updaterFn, index)(arr)
    const result4 = update_(updaterFn)(index)(arr)

    const expected = [1, 4, 3]

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it("always returns a new array", () => {
    const arr = [1, 2, 3]
    const updaterFn = (x) => x * 2
    const index = 1

    const result = update_(updaterFn, index, arr)

    expect(result).not.toBe(arr)
  })

  it("throws when an  index is out of bound of the array", () => {
    const arr = [1, 2, 3]
    const updaterFn = (x) => x * 2
    const index = 10

    const call = () => update_(updaterFn, index, arr)

    expect(call).toThrowError(
      "The provided index is out of bound of the array.",
    )
  })
})
