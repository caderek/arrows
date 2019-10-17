import isIn from './isIn'

describe('isIn', () => {
  it('returns true if a value is inside the array', () => {
    const result = isIn([1, 2, 3], 2)

    expect(result).toEqual(true)
  })

  it('returns false if a value is not inside the array', () => {
    const result = isIn([1, 2, 3], 4)

    expect(result).toEqual(false)
  })

  it('returns true if a value is inside the Set', () => {
    const result = isIn(new Set([1, 2, 3]), 2)

    expect(result).toEqual(true)
  })

  it('returns false if a value is not inside the Set', () => {
    const result = isIn(new Set([1, 2, 3]), 4)

    expect(result).toEqual(false)
  })
})
