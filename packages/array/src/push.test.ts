import push from './push'

describe('Array push', () => {
  it('returns array with additional element at the end', () => {
    const arr = [1, 2, 3]
    const result = push(4)(arr)
    const expected = [1, 2, 3, 4]

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = [1]
    const result = push(2)(arr)

    expect(result).not.toBe(arr)
  })
})
