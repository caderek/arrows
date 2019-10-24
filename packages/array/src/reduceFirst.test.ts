import { reduceFirst } from './index'

describe('Array reduceFirst', () => {
  it('provides functional wrapper for Array.prototype.reduce - no initial accumulator', () => {
    const arr = [1, 2, 3]
    const reducingFn = (acc, value) => acc + value

    const result = reduceFirst(reducingFn, arr)
    const result2 = reduceFirst(reducingFn)(arr)

    const expected = arr.reduce(reducingFn)

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
