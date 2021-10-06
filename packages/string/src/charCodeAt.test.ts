import { charCodeAt } from './index'

describe('String charCodeAt', () => {
  it('provides a functional wrapper for String.prototype.charAt', () => {
    const str = 'hello'
    const index = 1

    const result = charCodeAt(index, str)
    const result2 = charCodeAt(index)(str)

    const expected = str.charCodeAt(index)

    expect(result).toEqual(101)
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
