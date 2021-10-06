import { codePointAt } from './index'

describe('String charAt', () => {
  it('provides a functional wrapper for String.prototype.codePointAt', () => {
    const str = '☃★♲'
    const pos = 1

    const result = codePointAt(pos, str)
    const result2 = codePointAt(pos)(str)

    const expected = str.codePointAt(pos)

    expect(result).toEqual(9733)
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
