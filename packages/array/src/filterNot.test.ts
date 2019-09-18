import filterNot from './filterNot'

describe('Array filterNot', () => {
  it('works like filter, but result of filtering function is negated', () => {
    const arr = [1, 2, 3]
    const filteringFn = (x) => x === 1

    const result = filterNot(filteringFn)(arr)
    const expected = [2, 3]

    expect(result).toEqual(expected)
  })
})
