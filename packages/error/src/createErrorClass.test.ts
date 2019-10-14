import { createErrorClass } from './createErrorClass'

describe('createErrorClass', () => {
  it('creates a custom error class', () => {
    const CustomError = createErrorClass('CustomError', 'custom error')

    const error = new CustomError()

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(CustomError)
    expect(error.message).toEqual('custom error')
  })

  it('creates a custom error class that accepts details', () => {
    const CustomError = createErrorClass('CustomError', 'custom error')

    const error = new CustomError('some details')

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(CustomError)
    expect(error.message).toEqual('custom error')
    expect(error.details).toEqual('some details')
  })

  it('error instance can be serialized to JSON without stacktrace', () => {
    const CustomError = createErrorClass('CustomError', 'custom error')

    const error = new CustomError('some details')

    const serialized = JSON.parse(error.toJSON())

    expect(serialized.error.name).toEqual('CustomError')
    expect(serialized.error.message).toEqual('custom error')
    expect(serialized.error.details).toEqual('some details')
    expect(serialized.error.stacktrace).toEqual(undefined)
  })

  it('error instance can be serialized to JSON with stacktrace', () => {
    const CustomError = createErrorClass('CustomError', 'custom error', true)

    const error = new CustomError()

    const serialized = JSON.parse(error.toJSON())

    expect(serialized.error.name).toEqual('CustomError')
    expect(serialized.error.message).toEqual('custom error')
    expect(serialized.error.details).toEqual(null)
    expect(typeof serialized.error.stacktrace).toEqual('string')
  })
})
