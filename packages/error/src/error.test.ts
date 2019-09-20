import error from './error'

describe('error.create', () => {
  it('creates a custom error class', () => {
    const CustomError = error.create({
      name: 'CustomError',
      defaultMessage: 'oops!',
    })

    expect(CustomError).toBeInstanceOf(Function)
    expect(new CustomError()).toBeInstanceOf(Error)
  })
})
