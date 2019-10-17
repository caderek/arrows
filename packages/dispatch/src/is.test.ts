import is from './is'

describe('is', () => {
  it('returns true if the value is an instance of the prototype', () => {
    class Cat {}
    const result = is(Cat)(new Cat())

    expect(result).toEqual(true)
  })

  it('returns false if the value is not an instance of the prototype', () => {
    class Cat {}
    class Dog {}
    const result = is(Cat)(new Dog())

    expect(result).toEqual(false)
  })
})
