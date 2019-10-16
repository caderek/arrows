import curry from './curry'

describe('curry', () => {
  it('returns original function for functions of arity 0', () => {
    const fn = () => null
    const curried = curry(fn)

    expect(curried).toBe(fn)
  })

  it('returns original function for functions of arity 1', () => {
    const fn = (a) => a
    const curried = curry(fn)

    expect(curried).toBe(fn)
  })

  it('returns original function for variadic functions', () => {
    const fn = (...args) => args
    const curried = curry(fn)

    expect(curried).toBe(fn)
  })

  it('returns curried function for function of arity 2', () => {
    const fn = (a, b) => [a, b]
    const curried = curry(fn)

    expect(curried).not.toBe(fn)
    expect(typeof curried(1)).toEqual('function')
    expect(curried(1, 2)).toEqual([1, 2])
    expect(curried(1)(2)).toEqual([1, 2])
  })

  it('returns curried function for function of arity 3 and more', () => {
    const fn = (a, b, c) => [a, b, c]
    const curried = curry(fn)

    expect(curried).not.toBe(fn)
    expect(typeof curried(1)).toEqual('function')
    expect(typeof curried(1)(2)).toEqual('function')
    expect(typeof curried(1, 2)).toEqual('function')
    expect(curried(1, 2, 3)).toEqual([1, 2, 3])
    expect(curried(1)(2, 3)).toEqual([1, 2, 3])
    expect(curried(1, 2)(3)).toEqual([1, 2, 3])
    expect(curried(1)(2)(3)).toEqual([1, 2, 3])
  })
})
