import _filterNot from './_filterNot'

describe('Array filterNotX', () => {
  it('works like filter, but result of filtering function is negated', () => {
    const arr = [1, 2, 3]
    const filteringFn = (x) => x === 1

    const result = _filterNot(filteringFn)(arr)
    const expected = [2, 3]

    expect(result).toEqual(expected)
  })
})
