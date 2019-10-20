import { chain } from './index'

describe('chain', () => {
  it('chains functions left to right with a custom wrapping function', () => {
    const wrappingFn = (fn, input) => fn(input + 1)
    const myChain = chain(wrappingFn)

    const result = myChain((x) => x * 2, (x) => x + 3)(0)

    expect(result).toEqual(6)
  })
})
