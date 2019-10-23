import { rest_ } from './index'

describe('Array rest', () => {
  it('returns the array without first element', () => {
    const arr = [1, 2, 3, 4]

    const result = rest_(arr)
    const expected = [2, 3, 4]

    expect(result).toEqual(expected)
  })

  it('returns empty array if there is no tail', () => {
    const arr = []

    const result = rest_(arr)
    const expected = []

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = []

    const result = rest_(arr)

    expect(result).not.toBe(arr)
  })
})
