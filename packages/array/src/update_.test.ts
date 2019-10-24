import { update_ } from './index'

describe('Array update', () => {
  it('returns array with new value on provided index, calculated from old value', () => {
    const arr = [1, 2, 3]
    const updaterFn = (x) => x * 2
    const index = 1

    const result = update_(updaterFn, index, arr)
    const result2 = update_(updaterFn)(index, arr)
    const result3 = update_(updaterFn, index)(arr)
    const result4 = update_(updaterFn)(index)(arr)

    const expected = [1, 4, 3]

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  // ! @todo Update this (no default value as argument)
  it('uses provided value for calculation, if original value is not set', () => {
    const arr = [1, undefined, 3]
    const result = update_((x = 2) => x * 2, 1, arr)
    const expected = [1, 4, 3]

    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = [1, 2, 3]
    const result = update_((x) => x * 2, 1, arr)

    expect(result).not.toBe(arr)
  })
})
