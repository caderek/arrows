import { pipe } from './index'

describe('pipe', () => {
  describe('when partially applied', () => {
    it('returns new function that is a composition of supplied functions', () => {
      const fn = pipe(
        (x: number) => x + 1,
        (x) => x * 2,
      )

      expect(fn).toBeInstanceOf(Function)
    })

    it('returned function has the arity of one', () => {
      const fn = pipe(
        (x: number) => x + 1,
        (x) => x * 2,
      )

      expect(fn.length).toBe(1)
    })
  })

  describe('when fully applied', () => {
    it('executes provided functions on provided argument top to bottom', () => {
      const fn = pipe(
        (x) => `${x} one`,
        (x) => `${x} two`,
      )

      const result = fn('zero')
      const expected = 'zero one two'

      expect(result).toEqual(expected)
    })
  })
})
