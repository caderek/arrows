import includes from './includes'

describe('Array includes', () => {
  it('provides functional wrapper for Array.prototype.includes - match', () => {
    const arr = [1, 2, 3]
    const value = 2

    const result = includes(value)(arr)
    const expected = arr.includes(value)

    expect(result).toEqual(expected)
  })

  it('provides functional wrapper for Array.prototype.includes - no match', () => {
    const arr = [1, 2, 3]
    const value = 4

    const result = includes(value)(arr)
    const expected = arr.includes(value)

    expect(result).toEqual(expected)
  })
})
