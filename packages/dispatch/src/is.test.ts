import is from './is'

describe('is', () => {
  it('when partially applied returns a function with arity of one', () => {
    const isBoolean = is(Boolean)

    expect(isBoolean).toBeInstanceOf(Function)
    expect(isBoolean.length).toBe(1)
  })

  it('when fully applied returns true if the value is instance of the passed prototype', () => {
    class Cat {}
    const result = is(Cat)(new Cat())
    const expected = true

    expect(result).toEqual(expected)
  })
})
