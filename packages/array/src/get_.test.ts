import { get_ } from './index'

describe('Array get', () => {
  it('returns element on provided index', () => {
    const arr = [1, 2, 3, 4]
    const index = 2

    const result = get_(index, arr)
    const result2 = get_(index)(arr)

    const expected = arr[index]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it('returns undefined if an index is out of bound of the array', () => {
    const arr = [1, 2, 3, 4]
    const index = 10

    const result = get_(index, arr)
    const result2 = get_(index)(arr)

    const expected = arr[index]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
