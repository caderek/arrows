import { groupBy_ } from './index'

describe('Array groupByX', () => {
  it('returns object that groups array elements by key calculated by grouping function', () => {
    const arr = [
      { type: 'animal', name: 'monkey' },
      { type: 'plant', name: 'oak' },
      { type: 'animal', name: 'elephant' },
      { type: 'mineral', name: 'quartz' },
    ]
    const groupingFn = (item) => item.type

    const result = groupBy_(groupingFn, arr)
    const result2 = groupBy_(groupingFn)(arr)

    const expected = {
      animal: [
        { type: 'animal', name: 'monkey' },
        { type: 'animal', name: 'elephant' },
      ],
      plant: [{ type: 'plant', name: 'oak' }],
      mineral: [{ type: 'mineral', name: 'quartz' }],
    }

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })

  it('returns empty object if empty array is provided', () => {
    const arr = []
    const groupingFn = (item) => item.type

    const result = groupBy_(groupingFn, arr)
    const result2 = groupBy_(groupingFn)(arr)
    const expected = {}

    expect(result).toEqual(result2)
    expect(result).toEqual(expected)
  })
})
