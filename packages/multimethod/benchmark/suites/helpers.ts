import { method } from '../../src'

const createNMethods = (makeCaseVal, makeCaseCorrespondingVal) => (n) => {
  return Array.from({ length: n }, (_, i) =>
    method(makeCaseVal(i + 1), makeCaseCorrespondingVal(i + 1)),
  )
}

export const createNMethodsWithSimpleValVal = createNMethods((x) => x, (x) => x)

export const createNMethodsWithSimpleFunFun = createNMethods(
  (x) => (arg) => arg === x,
  (x) => () => x,
)

export const createNMethodsWithComplexCaseVal = createNMethods(
  (x) => ({ foo: x, bar: { baz: x, bat: [x, x, x] } }),
  (x) => x,
)
