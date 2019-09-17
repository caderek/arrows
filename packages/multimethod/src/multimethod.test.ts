import { multi } from './multimethod'

describe('multi', () => {
  describe('executed with dispatch function only', () => {
    it('creates multimethod that throws error: no matching method', () => {
      const fn = multi(() => true)
      expect(fn).toThrowError('No method specified for provided arguments')
    })
  })
})
