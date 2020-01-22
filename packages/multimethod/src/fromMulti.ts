import compose from "@arrows/composition/compose"
import { NoArgumentsError, NotMethodError, NotMultimethodError } from "./errors"
import { areMethodsValid, multimethodKey } from "./internal/multimethod"
import { MethodFn, Multimethod } from "./internal/types"

type FromMulti = (
  ...methods: MethodFn[]
) => (multimethod: Multimethod) => Multimethod

/**
 * Creates a new multimethods from the existing ones,
 * convenient for adding multiple methods.
 */
const fromMulti: FromMulti = (...methods) => (multimethod) => {
  if (methods.length === 0) {
    throw new NoArgumentsError()
  }

  if (!areMethodsValid(methods)) {
    throw new NotMethodError()
  }

  if (typeof multimethod !== "function" || !multimethod[multimethodKey]) {
    throw new NotMultimethodError()
  }

  return compose(...methods)(multimethod) as Multimethod
}

export { fromMulti }
export default fromMulti
