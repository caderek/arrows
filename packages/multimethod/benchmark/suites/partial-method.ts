import { add, complete, configure, cycle, save, suite } from 'benny'
import { method, multi } from '../../src'

const { version } = require('../../package.json')

export default suite(
  'Partial method creation',

  add('Create partial method - (val)', () => {
    method('foo')
  }),

  add('Create partial method - (fn)', () => {
    method(() => null)
  }),

  add('Create partial method - (val, val)', () => {
    method('foo', 'bar')
  }),

  add('Create partial method - (fn, fn)', () => {
    method(
      () => null,
      () => null,
    )
  }),

  add('Create partial method - (fn, val)', () => {
    method(() => null, 'bar')
  }),

  add('Create partial method - (val, fn)', () => {
    method('foo', () => null)
  }),

  configure({ cases: { maxTime: 15 } }),

  cycle(),
  complete(),
  save({ file: `${version}-partial-method`, version }),
  save({ file: `${version}-partial-method`, format: 'chart.html' }),
)
