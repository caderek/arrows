import { multi, method, inspect, _ } from './index'
import { NoArgumentsError, NotMultimethodError } from './errors'

describe.only('inspect', () => {
  it('throws an error (not enough arguments)', () => {
    expect(inspect).toThrowError(NoArgumentsError)
  })

  it('throws an error (not a multimethod)', () => {
    const notMultimethod = () => {} // tslint:disable-line
    const execute = () => {
      // @ts-ignore
      inspect(notMultimethod)
    }

    expect(execute).toThrowError(NotMultimethodError)
  })

  it('creates inspection object', () => {
    const multimethod = multi(method(1, 1))

    const inspectObject = inspect(multimethod)

    expect(inspectObject).toHaveProperty('dispatch')
    expect(inspectObject).toHaveProperty('entries')
    expect(inspectObject).toHaveProperty('cases')
    expect(inspectObject).toHaveProperty('values')
  })
})
