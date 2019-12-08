import { flat } from "./index"

describe("Array flat", () => {
  it("provides functional wrapper for Array.prototype.flat - depth one", () => {
    const arr = [
      [1, 2],
      [3, 4],
    ]
    const depth = 1

    const result = flat(depth, arr)
    const result2 = flat(depth)(arr)
    // @ts-ignore
    const expected = arr.flat(depth)

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("provides functional wrapper for Array.prototype.flat - higher depth", () => {
    const arr = [
      [
        [1, 2],
        [3, 4],
      ],
    ]
    const depth = 2

    const result = flat(depth, arr)
    const result2 = flat(depth)(arr)
    // @ts-ignore
    const expected = arr.flat(depth)

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it("provides functional wrapper for Array.prototype.flat - default depth (1)", () => {
    const arr = [
      [1, 2],
      [3, 4],
    ]

    const result = flat.one(arr)
    // @ts-ignore
    const expected = arr.flat()

    expect(result).toEqual(expected)
  })
})
