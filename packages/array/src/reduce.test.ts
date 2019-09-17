import reduce from './reduce'

describe('Array reduce', () => {
  it('provides functional wrapper for Array.prototype.reduce', () => {
    const arr = [1, 2, 3]
    const reducingFn = (acc, value) => acc + value
    const initialValue = 0

    const result = reduce(reducingFn, initialValue)(arr)
    const expected = arr.reduce(reducingFn, initialValue)

    expect(result).toEqual(expected)
  })
})
