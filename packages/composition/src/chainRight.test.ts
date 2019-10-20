import { chainRight } from './index'

describe('chainRight', () => {
  it('chains functions right to left with a custom wrapping function', () => {
    const wrappingFn = (fn, input) => fn(input + 1)
    const myChain = chainRight(wrappingFn)

    const result = myChain((x) => x * 2, (x) => x + 3)(0)

    expect(result).toEqual(10)
  })
})
