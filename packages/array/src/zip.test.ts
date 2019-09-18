import zip from './zip'

describe('Array zip', () => {
  it('returns correct pairs for arrays with equal length', () => {
    const arr = [1, 2, 3]
    const otherArr = [3, 4, 5]
    const result = zip(otherArr)(arr)
    const expected = [[1, 3], [2, 4], [3, 5]]

    expect(result).toEqual(expected)
  })

  it('returns correct pairs for when base array is shorter', () => {
    const arr = [1, 2]
    const otherArr = [3, 4, 5]
    const result = zip(otherArr)(arr)
    const expected = [[1, 3], [2, 4]]

    expect(result).toEqual(expected)
  })

  it('returns correct pairs for when base array is longer', () => {
    const arr = [1, 2, 3]
    const otherArr = [3, 4]
    const result = zip(otherArr)(arr)
    const expected = [[1, 3], [2, 4]]

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = []
    const otherArr = []
    const result = zip(otherArr)(arr)

    expect(result).not.toBe(arr)
  })
})
