import _size from './_size'

describe('Array size', () => {
  it('provides functional wrapper for array.length', () => {
    const arr = [1, 2, 3]

    const result = _size(arr)
    const expected = arr.length

    expect(result).toEqual(expected)
  })
})
