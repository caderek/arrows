import getType from './getType'
import types from './types'

describe('getType', () => {
  it('if value is undefined returns "undefined"', () => {
    const result = getType(undefined)
    const expected = types.Undefined

    expect(result).toEqual(expected)
  })

  it('if value is null returns "Null"', () => {
    const result = getType(null)
    const expected = types.Null

    expect(result).toEqual(expected)
  })

  it('if value is a string returns "String"', () => {
    const result = getType('foo')
    const expected = types.String

    expect(result).toEqual(expected)
  })

  it('if value is an instance of the String returns "String"', () => {
    const result = getType(new String())
    const expected = types.String

    expect(result).toEqual(expected)
  })

  it('if value is a number returns "Number"', () => {
    const result = getType(1)
    const expected = types.Number

    expect(result).toEqual(expected)
  })

  it('if value is an instance of the Number returns "Number"', () => {
    const result = getType(new Number())
    const expected = types.Number

    expect(result).toEqual(expected)
  })

  it('if value is a big int returns "BigInt"', () => {
    // @ts-ignore
    const result = getType(1n)
    const expected = types.BigInt

    expect(result).toEqual(expected)
  })

  it('if value is a boolean returns "Boolean"', () => {
    const result = getType(true)
    const expected = types.Boolean

    expect(result).toEqual(expected)
  })

  it('if value is an instance of the Boolean returns "Boolean"', () => {
    const result = getType(new Boolean())
    const expected = types.Boolean

    expect(result).toEqual(expected)
  })

  it('if value is an array literal returns "Array"', () => {
    const result = getType([])
    const expected = types.Array

    expect(result).toEqual(expected)
  })

  it('if value is an instance of the Array returns "Array"', () => {
    const result = getType(new Array())
    const expected = types.Array

    expect(result).toEqual(expected)
  })

  it('if value is an object literal returns "Object"', () => {
    const result = getType({})
    const expected = types.Object

    expect(result).toEqual(expected)
  })

  it('if value is an instance of the Object returns "Object"', () => {
    const result = getType(new Object())
    const expected = types.Object

    expect(result).toEqual(expected)
  })

  it('if value is a raw object returns "Object"', () => {
    const result = getType(Object.create(null))
    const expected = types.Object

    expect(result).toEqual(expected)
  })

  it('if value is a regexp literal returns "RegExp"', () => {
    const result = getType(/a/)
    const expected = types.RegExp

    expect(result).toEqual(expected)
  })

  it('if value is an instance of the RegExp returns "RegExp"', () => {
    const result = getType(new RegExp(''))
    const expected = types.RegExp

    expect(result).toEqual(expected)
  })

  it('if value is an arrow function literal returns "Function"', () => {
    const result = getType(() => {})
    const expected = types.Function

    expect(result).toEqual(expected)
  })

  it('if value is a regular function returns "Function"', () => {
    const result = getType(function() {})
    const expected = types.Function

    expect(result).toEqual(expected)
  })

  it('if value is an instance of the Function returns "RegExp"', () => {
    const result = getType(new Function())
    const expected = types.Function

    expect(result).toEqual(expected)
  })

  it('if value is an instance of the Promise returns "Promise"', () => {
    const result = getType(Promise.resolve())
    const expected = types.Promise

    expect(result).toEqual(expected)
  })

  it('if value is a Symbol returns "Symbol"', () => {
    const result = getType(Symbol())
    const expected = types.Symbol

    expect(result).toEqual(expected)
  })

  it('if value is an Error returns "Error"', () => {
    const result = getType(new Error())
    const expected = types.Error

    expect(result).toEqual(expected)
  })

  it('if value is an instance of custom class returns name of the build-in class that it extends', () => {
    class Animal {}
    class Cat extends Animal {}
    class MyError extends Error {}

    expect(getType(new Animal())).toEqual(types.Object)
    expect(getType(new Cat())).toEqual(types.Object)
    expect(getType(new MyError())).toEqual(types.Error)
  })
})
