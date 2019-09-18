import get from './get'

describe('Array flat', () => {
  it('returns element on provided index', () => {
    const arr = [1, 2, 3, 4]
    const index = 2

    const result = get(index)(arr)
    const expected = arr[index]

    expect(result).toEqual(expected)
  })
})
