import { reduceRight } from './index'

describe('Array reduceRight', () => {
  it('provides functional wrapper for Array.prototype.reduceRight', () => {
    const arr = [1, 2, 3]
    const reducingFn = (acc, value) => acc + value
    const initialValue = 0

    const result = reduceRight(reducingFn, initialValue, arr)
    const result2 = reduceRight(reducingFn, initialValue)(arr)
    const result3 = reduceRight(reducingFn)(initialValue, arr)
    const result4 = reduceRight(reducingFn)(initialValue)(arr)

    const expected = arr.reduceRight(reducingFn, initialValue)

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it('provides functional wrapper for Array.prototype.reduce - no initial accumulator', () => {
    const arr = [1, 2, 3]
    const reducingFn = (acc, value) => acc + value

    const result = reduceRight.first(reducingFn, arr)
    const result2 = reduceRight.first(reducingFn)(arr)

    const expected = arr.reduce(reducingFn)

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
