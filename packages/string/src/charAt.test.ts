import { charAt } from './index'

describe('String charAt', () => {
  it('provides a functional wrapper for String.prototype.charAt', () => {
    const str = 'hello'
    const index = 1

    const result = charAt(index, str)
    const result2 = charAt(index)(str)

    const expected = str.charAt(index)

    expect(result).toEqual('e')
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
