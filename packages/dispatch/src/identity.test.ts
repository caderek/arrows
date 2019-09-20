import identity from './identity'

describe('identity', () => {
  it('always return value of the first argument', () => {
    const result = identity(1)
    const expected = 1

    expect(result).toEqual(expected)
  })
})
