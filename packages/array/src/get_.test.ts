import { get_ } from './index'

describe('Array getX', () => {
  it('returns element on provided index', () => {
    const arr = [1, 2, 3, 4]
    const index = 2

    const result = get_(index)(arr)
    const expected = arr[index]

    expect(result).toEqual(expected)
  })
})
