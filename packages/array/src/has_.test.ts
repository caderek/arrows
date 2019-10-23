import { has_ } from './index'

describe('Array flat', () => {
  it('returns true if the array has provided index', () => {
    const arr = [1, 2, 3, 4]
    const index = 2

    const result = has_(index)(arr)
    const expected = true

    expect(result).toEqual(expected)
  })

  it('returns false if the array does not have provided index', () => {
    const arr = [1, 2, 3, 4]
    const index = 10

    const result = has_(index)(arr)
    const expected = false

    expect(result).toEqual(expected)
  })
})
