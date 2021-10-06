import { concat } from './index'

describe('String concat', () => {
  it('provides a functional wrapper for String.prototype.concat', () => {
    const str = 'hello'
    const strToAdd = ' world'

    const result = concat(strToAdd, str)
    const result2 = concat(strToAdd)(str)

    const expected = str.concat(strToAdd)

    expect(result).toEqual('hello world')
    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
