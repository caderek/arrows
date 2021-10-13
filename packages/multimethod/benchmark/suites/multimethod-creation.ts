import { add, complete, cycle, save, suite } from 'benny'
import { method, multi } from '../../src'
import {
  createNMethodsWithSimpleFunFun,
  createNMethodsWithSimpleValVal,
} from './helpers'

const { version } = require('../../package.json')

export default suite(
  'Multimethod creation',

  add('Create multimethod with custom dispatch - one chunk', () => {
    multi((a) => a)
  }),

  add('Create multimethod with custom dispatch - two chunks', () => {
    multi((a) => (b) => a)
  }),

  add('Create multimethod with custom dispatch - three chunks', () => {
    multi((a) => (b) => (c) => a)
  }),

  add('Create multimethod with custom dispatch - ten chunks', () => {
    multi((a) => (b) => (c) => (d) => (e) => (f) => (g) => (h) => (i) => (j) =>
      a,
    )
  }),

  add('Create multimethod with a default method only', () => {
    multi(method(() => null))
  }),

  add('Create multimethod with one simple val/val method', () => {
    const methods = createNMethodsWithSimpleValVal(1)

    return () => multi(...methods)
  }),

  add('Create multimethod with three simple val/val methods', () => {
    const methods = createNMethodsWithSimpleValVal(3)

    return () => multi(...methods)
  }),

  add('Create multimethod with ten simple val/val methods', () => {
    const methods = createNMethodsWithSimpleValVal(10)

    return () => multi(...methods)
  }),

  add('Create multimethod with a hundred simple val/val methods', () => {
    const methods = createNMethodsWithSimpleValVal(100)

    return () => multi(...methods)
  }),

  add('Create multimethod with a thousand simple val/val methods', () => {
    const methods = createNMethodsWithSimpleValVal(1000)

    return () => multi(...methods)
  }),

  add('Create multimethod with one simple fun/fun method', () => {
    const methods = createNMethodsWithSimpleFunFun(1)

    return () => multi(...methods)
  }),

  add('Create multimethod with three simple fun/fun methods', () => {
    const methods = createNMethodsWithSimpleFunFun(3)

    return () => multi(...methods)
  }),

  add('Create multimethod with ten simple fun/fun methods', () => {
    const methods = createNMethodsWithSimpleFunFun(10)

    return () => multi(...methods)
  }),

  add('Create multimethod with a hundred simple fun/fun methods', () => {
    const methods = createNMethodsWithSimpleFunFun(100)

    return () => multi(...methods)
  }),

  add('Create multimethod with a thousand simple fun/fun methods', () => {
    const methods = createNMethodsWithSimpleFunFun(1000)

    return () => multi(...methods)
  }),

  cycle(),
  complete(),
  save({ file: `${version}-multimethod-creation`, version }),
  save({ file: `${version}-multimethod-creation`, format: 'chart.html' }),
)
