import { filterNot_ } from './index'

describe('Array filterNotX', () => {
  it('works like filter, but result of filtering function is negated', () => {
    const arr = [1, 2, 3]
    const filteringFn = (x) => x === 1

    const result = filterNot_(filteringFn, arr)
    const result2 = filterNot_(filteringFn)(arr)
    const expected = [2, 3]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
