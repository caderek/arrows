import { sortBy_ } from './index'

describe('Array sortBy', () => {
  it('sorts array by values calculated by mapping function', () => {
    const arr = [2, -2, 5, -5, 1, 0]
    const compareFn = (a, b) => a - b
    const mappingFn = (x) => Math.abs(x)

    const result = sortBy_(compareFn, mappingFn, arr)
    const result2 = sortBy_(compareFn, mappingFn)(arr)
    const result3 = sortBy_(compareFn)(mappingFn, arr)
    const result4 = sortBy_(compareFn)(mappingFn)(arr)

    const expected = [0, 1, 2, -2, 5, -5]

    expect(result).toEqual(result2)
    expect(result).toEqual(result3)
    expect(result).toEqual(result4)
    expect(result).toEqual(expected)
  })

  it('always returns a new array', () => {
    const arr = []
    const compareFn = (a, b) => a - b
    const mappingFn = (x) => x

    const result = sortBy_(compareFn)(mappingFn)(arr)

    expect(result).not.toBe(arr)
  })

  it('provides a method for numerical sort', () => {
    const arr = [{ age: 1 }, { age: 3 }, { age: 2 }, { age: 4 }]
    const mappingFn = (x) => x.age

    const result = sortBy_.num(mappingFn, arr)
    const result2 = sortBy_.num(mappingFn)(arr)

    const expected = [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it('provides a method for numerical sort - descending', () => {
    const arr = [{ age: 1 }, { age: 3 }, { age: 2 }, { age: 4 }]
    const mappingFn = (x) => x.age

    const result = sortBy_.numDesc(mappingFn, arr)
    const result2 = sortBy_.numDesc(mappingFn)(arr)

    const expected = [{ age: 4 }, { age: 3 }, { age: 2 }, { age: 1 }]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it('provides a method for alphabetical sort', () => {
    const arr = [{ name: 'Lee' }, { name: 'Bob' }, { name: 'Joe' }]
    const mappingFn = (x) => x.name

    const result = sortBy_.str(mappingFn, arr)
    const result2 = sortBy_.str(mappingFn, arr)

    const expected = [{ name: 'Bob' }, { name: 'Joe' }, { name: 'Lee' }]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it('provides a method for alphabetical sort - descending', () => {
    const arr = [{ name: 'Lee' }, { name: 'Bob' }, { name: 'Joe' }]
    const mappingFn = (x) => x.name

    const result = sortBy_.strDesc(mappingFn, arr)
    const result2 = sortBy_.strDesc(mappingFn, arr)

    const expected = [{ name: 'Lee' }, { name: 'Joe' }, { name: 'Bob' }]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it('provides a method for locale alphabetical sort', () => {
    const arr = [{ name: 'Lee' }, { name: 'Bob' }, { name: 'Joe' }]
    const mappingFn = (x) => x.name

    const result = sortBy_.locale(mappingFn, arr)
    const result2 = sortBy_.locale(mappingFn, arr)

    const expected = [{ name: 'Bob' }, { name: 'Joe' }, { name: 'Lee' }]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it('provides a method for locale alphabetical sort - descending', () => {
    const arr = [{ name: 'Lee' }, { name: 'Bob' }, { name: 'Joe' }]
    const mappingFn = (x) => x.name

    const result = sortBy_.localeDesc(mappingFn, arr)
    const result2 = sortBy_.localeDesc(mappingFn, arr)

    const expected = [{ name: 'Lee' }, { name: 'Joe' }, { name: 'Bob' }]

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
