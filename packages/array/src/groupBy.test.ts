import groupBy from './groupBy'

describe('Array groupBy', () => {
  it('returns object that groups array elements by key calculated by grouping function', () => {
    const arr = [
      { type: 'animal', name: 'monkey' },
      { type: 'plant', name: 'oak' },
      { type: 'animal', name: 'elephant' },
      { type: 'mineral', name: 'quartz' },
    ]
    const groupingFn = (item) => item.type

    const result = groupBy(groupingFn)(arr)
    const expected = {
      animal: [
        { type: 'animal', name: 'monkey' },
        { type: 'animal', name: 'elephant' },
      ],
      plant: [{ type: 'plant', name: 'oak' }],
      mineral: [{ type: 'mineral', name: 'quartz' }],
    }

    expect(result).toEqual(expected)
  })

  it('returns empty object if empty array is provided', () => {
    const arr = []
    const groupingFn = (item) => item.type

    const result = groupBy(groupingFn)(arr)
    const expected = {}

    expect(result).toEqual(expected)
  })
})
