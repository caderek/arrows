import { add, complete, cycle, save, suite } from 'benny'
import { method, multi } from '../../src'
import {
  createNMethodsWithComplexCaseVal,
  createNMethodsWithSimpleFunFun,
  createNMethodsWithSimpleValVal,
} from './helpers'

const { version } = require('../../package.json')

export default suite(
  'Multimethod execution',

  add('Execute identity function for reference', () => {
    const fn = (x) => x

    return () => fn('foo')
  }),

  add('Execute multimethod with default method as value only', () => {
    const fn = multi(method('default'))

    return () => fn('foo')
  }),

  add(
    'Execute multimethod with one simple val/val method - last matching',
    () => {
      const methods = createNMethodsWithSimpleValVal(1)
      const fn = multi(...methods)

      return () => fn(1)
    },
  ),

  add(
    'Execute multimethod with three simple val/val methods - last matching',
    () => {
      const methods = createNMethodsWithSimpleValVal(3)
      const fn = multi(...methods)

      return () => fn(3)
    },
  ),

  add(
    'Execute multimethod with ten simple val/val methods - last matching',
    () => {
      const methods = createNMethodsWithSimpleValVal(10)
      const fn = multi(...methods)

      return () => fn(10)
    },
  ),

  add(
    'Execute multimethod with a hundred simple val/val methods - last matching',
    () => {
      const methods = createNMethodsWithSimpleValVal(100)
      const fn = multi(...methods)

      return () => fn(100)
    },
  ),

  add(
    'Execute multimethod with a thousand simple val/val methods - last matching',
    () => {
      const methods = createNMethodsWithSimpleValVal(1000)
      const fn = multi(...methods)

      return () => fn(1000)
    },
  ),

  add(
    'Execute multimethod with one simple fun/fun method - last matching',
    () => {
      const methods = createNMethodsWithSimpleFunFun(1)
      const fn = multi(...methods)

      return () => fn(1)
    },
  ),

  add(
    'Execute multimethod with three simple fun/fun methods - last matching',
    () => {
      const methods = createNMethodsWithSimpleFunFun(3)
      const fn = multi(...methods)

      return () => fn(3)
    },
  ),

  add(
    'Execute multimethod with ten simple fun/fun methods - last matching',
    () => {
      const methods = createNMethodsWithSimpleFunFun(10)
      const fn = multi(...methods)

      return () => fn(10)
    },
  ),

  add(
    'Execute multimethod with a hundred simple fun/fun methods - last matching',
    () => {
      const methods = createNMethodsWithSimpleFunFun(100)
      const fn = multi(...methods)

      return () => fn(100)
    },
  ),

  add(
    'Execute multimethod with a thousand simple fun/fun methods - last matching',
    () => {
      const methods = createNMethodsWithSimpleFunFun(1000)
      const fn = multi(...methods)

      return () => fn(1000)
    },
  ),

  add(
    'Execute multimethod with one complex caseVal method - last matching',
    () => {
      const methods = createNMethodsWithComplexCaseVal(1)
      const fn = multi(...methods)

      return () => fn({ foo: 1, bar: { baz: 1, bat: [1, 1, 1] } })
    },
  ),

  add(
    'Execute multimethod with three complex caseVal methods - last matching',
    () => {
      const methods = createNMethodsWithComplexCaseVal(3)
      const fn = multi(...methods)

      return () => fn({ foo: 3, bar: { baz: 3, bat: [3, 3, 3] } })
    },
  ),

  add(
    'Execute multimethod with ten complex caseVal methods - last matching',
    () => {
      const methods = createNMethodsWithComplexCaseVal(10)
      const fn = multi(...methods)

      return () => fn({ foo: 10, bar: { baz: 10, bat: [10, 10, 10] } })
    },
  ),

  add(
    'Execute multimethod with a hundred complex caseVal methods - last matching',
    () => {
      const methods = createNMethodsWithComplexCaseVal(100)
      const fn = multi(...methods)

      return () => fn({ foo: 100, bar: { baz: 100, bat: [100, 100, 100] } })
    },
  ),

  add(
    'Execute multimethod with a thousand complex caseVal methods - last matching',
    () => {
      const methods = createNMethodsWithComplexCaseVal(1000)
      const fn = multi(...methods)

      return () =>
        fn({ foo: 1000, bar: { baz: 1000, bat: [1000, 1000, 1000] } })
    },
  ),

  cycle(),
  complete(),
  save({ file: `${version}-multimethod-execution`, version }),
)
