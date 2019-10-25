import { forEach } from './index'

describe('Array forEach', () => {
  it('provides functional wrapper for Array.prototype.forEach', () => {
    const arr = [1, 2, 3]
    const sideEffectFn = (x) => x + 1

    const result = forEach(sideEffectFn, arr)
    const result2 = forEach(sideEffectFn)(arr)

    const expected = arr.forEach(sideEffectFn)

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
