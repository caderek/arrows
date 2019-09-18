import zipAll from './zipAll'

describe('Array zipAll', () => {
  it('returns correct pairs for arrays with equal length', () => {
    const arr = [1, 2, 3]
    const otherArr = [3, 4, 5]
    const result = zipAll(otherArr)(arr)
    const expected = [[1, 3], [2, 4], [3, 5]]

    expect(result).toEqual(expected)
  })

  it('returns correct pairs for when base array is shorter', () => {
    const arr = [1, 2]
    const otherArr = [3, 4, 5]
    const result = zipAll(otherArr)(arr)
    const expected = [[1, 3], [2, 4], [undefined, 5]]

    expect(result).toEqual(expected)
  })

  it('returns correct pairs for when base array is longer', () => {
    const arr = [1, 2, 3]
    const otherArr = [3, 4]
    const result = zipAll(otherArr)(arr)
    const expected = [[1, 3], [2, 4], [3, undefined]]

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = []
    const otherArr = []
    const result = zipAll(otherArr)(arr)

    expect(result).not.toBe(arr)
  })
})
