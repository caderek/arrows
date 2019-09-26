import * as Benchmark from 'benchmark'
import * as fs from 'fs-extra'
import { method, multi } from '../src'

const { version } = require('../package.json') // tslint:disable-line

const suite = new Benchmark.Suite()

const createNMethods = (
  n,
  createCaseValue = (x) => x,
  caseCorrespondingValue = () => null,
) => {
  return Array.from({ length: n }, (_, i) =>
    method(createCaseValue(i + 1), caseCorrespondingValue),
  )
}

const plainFn = () => null

const multimethod1 = multi(...createNMethods(1))
const multimethod10 = multi(...createNMethods(10))
const multimethod100 = multi(...createNMethods(100))
const multimethod1000 = multi(...createNMethods(1000))

const makeComplexVal = (x) => ({ foo: x, bar: { baz: x, bat: [x] } })

const multimethodComplexCaseValue1 = multi(...createNMethods(1, makeComplexVal))
const multimethodComplexCaseValue10 = multi(
  ...createNMethods(10, makeComplexVal),
)
const multimethodComplexCaseValue100 = multi(
  ...createNMethods(100, makeComplexVal),
)
const multimethodComplexCaseValue1000 = multi(
  ...createNMethods(1000, makeComplexVal),
)

suite
  .add('Create partial method - (val)', () => {
    method('foo')
  })
  .add('Create partial method - (fn)', () => {
    method(() => null)
  })
  .add('Create partial method - (val, val)', () => {
    method('foo', 'bar')
  })
  .add('Create partial method - (fn, fn)', () => {
    method(() => null, () => null)
  })
  .add('Create partial method - (fn, val)', () => {
    method(() => null, 'bar')
  })
  .add('Create partial method - (val, fn)', () => {
    method('foo', () => null)
  })
  .add('Create multimethod without args', () => {
    multi()
  })
  .add('Create multimethod with custom dispatch - one chunk', () => {
    multi((a) => a)
  })
  .add('Create multimethod with custom dispatch - two chunks', () => {
    multi((a) => (b) => a)
  })
  .add('Create multimethod with custom dispatch - three chunks', () => {
    multi((a) => (b) => (c) => a)
  })
  .add('Create multimethod with custom dispatch - ten chunks', () => {
    multi((a) => (b) => (c) => (d) => (e) => (f) => (g) => (h) => (i) => (j) =>
      a,
    )
  })
  .add('Create multimethod default method', () => {
    multi(method(() => null))
  })
  .add('Create multimethod with one method', () => {
    multi(...createNMethods(1))
  })
  .add('Create multimethod with five methods', () => {
    multi(...createNMethods(5))
  })
  .add('Create multimethod with twenty methods', () => {
    multi(...createNMethods(20))
  })
  .add('Create multimethod with a hundred methods', () => {
    multi(...createNMethods(100))
  })
  .add('Create multimethod with a thousand methods', () => {
    multi(...createNMethods(1000))
  })
  .add('Execute ordinary arrow function', () => {
    plainFn()
  })
  .add('Execute multimethod with one method', () => {
    multimethod1(1)
  })
  .add('Execute multimethod with ten methods (last matching)', () => {
    multimethod10(10)
  })
  .add('Execute multimethod with a hundred methods (last matching)', () => {
    multimethod100(100)
  })
  .add('Execute multimethod with a thousand methods (last matching)', () => {
    multimethod1000(1000)
  })
  .add('Execute multimethod with one method - complex match', () => {
    multimethodComplexCaseValue1(makeComplexVal(1))
  })
  .add(
    'Execute multimethod with ten methods - complex match (last matching)',
    () => {
      multimethodComplexCaseValue10(makeComplexVal(10))
    },
  )
  .add(
    'Execute multimethod with a hundred methods - complex match (last matching)',
    () => {
      multimethodComplexCaseValue100(makeComplexVal(100))
    },
  )
  .add(
    'Execute multimethod with a thousand methods - complex match (last matching)',
    () => {
      multimethodComplexCaseValue1000(makeComplexVal(1000))
    },
  )
  .on('cycle', ({ target }) => {
    console.log(String(target)) // tslint:disable-line
  })
  .on('complete', ({ timeStamp, currentTarget }) => {
    fs.writeFileSync(
      `benchmark/results.temp/${version}-${new Date(
        timeStamp,
      ).toISOString()}.json`,
      JSON.stringify(currentTarget, null, 2),
    )
  })
  .run({ async: true })
