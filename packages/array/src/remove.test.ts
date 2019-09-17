import remove from './remove'

describe('Array remove', () => {
  it('returns array without element on provided index - first index', () => {
    const arr = [1, 2, 3]
    const result = remove(0)(arr)
    const expected = [2, 3]

    expect(result).toEqual(expected)
  })

  it('returns array without element on provided index - middle index', () => {
    const arr = [1, 2, 3]
    const result = remove(1)(arr)
    const expected = [1, 3]

    expect(result).toEqual(expected)
  })

  it('returns array without element on provided index - last index', () => {
    const arr = [1, 2, 3]
    const result = remove(2)(arr)
    const expected = [1, 2]

    expect(result).toEqual(expected)
  })

  it('returns copy of the array if index is out of bound', () => {
    const arr = [1, 2, 3]
    const result = remove(10)(arr)
    const expected = [1, 2, 3]

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = [1]
    const result = remove(0)(arr)

    expect(result).not.toBe(arr)
  })
})
