import { reduceRightFirst } from './index'

describe('Array reduceRightFirst', () => {
  it('provides functional wrapper for Array.prototype.reduceRight - no initial accumulator', () => {
    const arr = [1, 2, 3]
    const reducingFn = (acc, value) => acc + value

    const result = reduceRightFirst(reducingFn, arr)
    const result2 = reduceRightFirst(reducingFn)(arr)

    const expected = arr.reduceRight(reducingFn)

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
