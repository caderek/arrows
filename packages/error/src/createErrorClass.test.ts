import { createErrorClass } from './createErrorClass'

describe('createErrorClass', () => {
  it('creates a custom error class', () => {
    const CustomError = createErrorClass('CustomError', 'Custom error.')

    const error = new CustomError()

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(CustomError)
    expect(error.message).toEqual('Custom error.')
  })

  it('creates a custom error class that accepts details', () => {
    const CustomError = createErrorClass('CustomError', 'Custom error.')

    const error = new CustomError('Some details.')

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(CustomError)
    expect(error.message).toEqual('Custom error. Some details.')
  })

  it('error instance can be serialized to JSON without stacktrace', () => {
    const CustomError = createErrorClass('CustomError', 'Custom error.')

    const error = new CustomError('Some details.')

    const serialized = JSON.parse(error.toJSON())

    expect(serialized.error.name).toEqual('CustomError')
    expect(serialized.error.message).toEqual('Custom error. Some details.')
    expect(serialized.error.stacktrace).toEqual(undefined)
  })

  it('error instance can be serialized to JSON with stacktrace', () => {
    const CustomError = createErrorClass('CustomError', 'Custom error.', true)

    const error = new CustomError()

    const serialized = JSON.parse(error.toJSON())

    expect(serialized.error.name).toEqual('CustomError')
    expect(serialized.error.message).toEqual('Custom error.')
    expect(typeof serialized.error.stacktrace).toEqual('string')
  })
})
