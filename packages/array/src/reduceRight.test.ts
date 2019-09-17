import reduceRight from './reduceRight'

describe('Array reduceRight', () => {
  it('provides functional wrapper for Array.prototype.reduceRight', () => {
    const arr = [1, 2, 3]
    const reducingFn = (acc, value) => acc + value
    const initialValue = 0

    const result = reduceRight(reducingFn, initialValue)(arr)
    const expected = arr.reduceRight(reducingFn, initialValue)

    expect(result).toEqual(expected)
  })
})
