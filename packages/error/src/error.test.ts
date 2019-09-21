import error from './error'

describe('error.create', () => {
  it('creates a custom error class without custom message', () => {
    const CustomError = error.create({
      name: 'CustomError',
    })

    expect(CustomError).toBeInstanceOf(Function)
    expect(new CustomError()).toBeInstanceOf(Error)
  })

  it('creates a custom error class with custom message', () => {
    const CustomError = error.create({
      name: 'CustomError',
      defaultMessage: 'oops!',
    })

    expect(CustomError).toBeInstanceOf(Function)
    expect(new CustomError()).toBeInstanceOf(Error)
  })
})

describe('error.toJSON', () => {
  it('serializes custom error', () => {
    const CustomError = error.create({
      name: 'CustomError',
      defaultMessage: 'oops!',
    })

    const customError = new CustomError()

    const result = error.toJSON(customError)
    const deserializedResult = JSON.parse(result)

    expect(typeof result).toEqual('string')
    expect(deserializedResult).toHaveProperty('error')
    expect(deserializedResult.error).toHaveProperty('name')
    expect(deserializedResult.error).toHaveProperty('message')
    expect(deserializedResult.error).toHaveProperty('stacktrace')
  })
})
