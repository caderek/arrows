import { pipe, railAsync, tap } from './index'

describe('tap', () => {
  describe('when argument is not a promise', () => {
    it('executes single-argument function on the argument an returns argument as-is', () => {
      const fn = jest.fn((x) => {}) // tslint:disable-line
      const result = tap(fn, 1)

      expect(result).toEqual(1)
      expect(fn.mock.calls.length).toBe(1)
      expect(fn.mock.calls[0][0]).toBe(1)
    })

    it('works correctly in a chain-like function', () => {
      const fn = jest.fn((x) => {}) // tslint:disable-line

      const result = pipe(
        (x) => x + 1,
        tap(fn),
        (x) => x * 2,
        tap(fn),
        (x) => x ** 2,
      )(0)

      expect(result).toBe(4)
      expect(fn.mock.calls.length).toBe(2)
      expect(fn.mock.calls[0][0]).toBe(1)
      expect(fn.mock.calls[1][0]).toBe(2)
    })
  })

  describe('when argument is a promise', () => {
    it('executes single-argument function on the resolved promise an returns argument as-is', async () => {
      const fn = jest.fn((x) => {}) // tslint:disable-line
      const result = await tap(fn, Promise.resolve(1))

      expect(result).toEqual(1)
      expect(fn.mock.calls.length).toBe(1)
      expect(fn.mock.calls[0][0]).toBe(1)
    })

    it('works correctly in a chain-like function', async () => {
      const fn = jest.fn((x) => {}) // tslint:disable-line

      const result = await railAsync(
        (x) => x + 1,
        tap(fn),
        (x) => x * 2,
        tap(fn),
        (x) => x ** 2,
      )(Promise.resolve(0))

      expect(result).toBe(4)
      expect(fn.mock.calls.length).toBe(2)
      expect(fn.mock.calls[0][0]).toBe(1)
      expect(fn.mock.calls[1][0]).toBe(2)
    })
  })
})
