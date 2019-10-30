import { railRightAsync } from './index'

describe('railRightAsync', () => {
  describe('when partially applied', () => {
    it('returns new function that is a composition of supplied functions', () => {
      const fn = railRightAsync((x) => x + 1, (x) => x * 2)

      expect(fn).toBeInstanceOf(Function)
    })

    it('returned function has the arity of one', () => {
      const fn = railRightAsync((x) => x + 1, (x) => x * 2)

      expect(fn.length).toBe(1)
    })
  })

  describe('when fully applied', () => {
    it('executes provided functions on provided argument right to left', async () => {
      const fn = railRightAsync((x) => `${x} one`, (x) => `${x} two`)

      const result = await fn('zero')
      const expected = 'zero two one'

      expect(result).toEqual(expected)
    })

    it('when one of the functions throws, passes the error as an end result', async () => {
      const fn = railRightAsync(
        (x) => x + 1,
        (x) => {
          throw new Error('Ooops!')
        },
        (x) => x * 2,
      )

      const result = await fn(1)

      expect(result).toBeInstanceOf(Error)
      expect(result.message).toEqual('Ooops!')
    })

    it('when one of the functions returns an error, passes the error as an end result', async () => {
      const fn = railRightAsync(
        (x) => x + 1,
        (x) => {
          return Error('Ooops!')
        },
        (x) => x * 2,
      )

      const result = await fn(1)

      expect(result).toBeInstanceOf(Error)
      expect(result.message).toEqual('Ooops!')
    })

    it('when one of the functions returns undefined, passes previous result to the next function', async () => {
      const fn = railRightAsync((x) => x + 1, (x) => undefined, (x) => x * 2)

      const result = await fn(1)
      const expected = 3

      expect(result).toEqual(expected)
    })

    it('when the component function returns promise, unwraps the promise before passing to the next function', async () => {
      const fn = railRightAsync(
        (x) => x + 1,
        (x) => Promise.resolve(x ** 2),
        (x) => x * 2,
      )

      const result = await fn(1)
      const expected = 5

      expect(result).toEqual(expected)
    })
  })

  it('always returns a promise', () => {
    const fn = railRightAsync((x) => x + 1)

    const result = fn(0)

    expect(result).toBeInstanceOf(Promise)
  })
})
