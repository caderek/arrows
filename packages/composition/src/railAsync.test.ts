import { railAsync } from './index'

describe('railAsync', () => {
  describe('when partially applied', () => {
    it('returns new function that is a composition of supplied functions', () => {
      const fn = railAsync((x) => x + 1, (x) => x * 2)

      expect(fn).toBeInstanceOf(Function)
    })

    it('returned function has the arity of one', () => {
      const fn = railAsync((x) => x + 1, (x) => x * 2)

      expect(fn.length).toBe(1)
    })
  })

  describe('when fully applied', () => {
    it('executes provided functions on provided argument left to right', () => {
      const fn = railAsync((x) => `${x} one`, (x) => `${x} two`)

      const result = fn('zero')
      const expected = 'zero one two'

      expect(result).toEqual(expected)
    })

    it('when one of the functions throws, passes the error as an end result', () => {
      const fn = railAsync(
        (x) => x + 1,
        (x) => {
          throw new Error('Ooops!')
        },
        (x) => x * 2,
      )

      const result = fn(1)

      expect(result).toBeInstanceOf(Error)
      expect(result.message).toEqual('Ooops!')
    })

    it('when one of the functions returns an error, passes the error as an end result', () => {
      const fn = railAsync(
        (x) => x + 1,
        (x) => {
          return Error('Ooops!')
        },
        (x) => x * 2,
      )

      const result = fn(1)

      expect(result).toBeInstanceOf(Error)
      expect(result.message).toEqual('Ooops!')
    })

    it('when one of the functions returns undefined, passes previous result to the next function', () => {
      const fn = railAsync((x) => x + 1, (x) => undefined, (x) => x * 2)

      const result = fn(1)
      const expected = 4

      expect(result).toEqual(expected)
    })

    it('when the component function returns promise, unwraps the promise before passing to the next function', async () => {
      const fn = railAsync(
        (x) => Promise.resolve(x + 1),
        (x) => x ** 2,
        (x) => x * 2,
      )

      const result = await fn(1)
      const expected = 8

      expect(result).toEqual(expected)
    })
  })
})
