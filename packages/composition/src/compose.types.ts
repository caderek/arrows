export type Compose20 = {
  <T1, R>(fn1: (arg: T1) => R): (initialArg: T1) => R

  <T1, T2, R>(fn2: (arg: T2) => R, fn1: (arg: T1) => T2): (initialArg: T1) => R

  <T1, T2, T3, R>(
    fn3: (arg: T3) => R,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <T1, T2, T3, T4, R>(
    fn4: (arg: T4) => R,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <T1, T2, T3, T4, T5, R>(
    fn5: (arg: T5) => R,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <T1, T2, T3, T4, T5, T6, R>(
    fn6: (arg: T6) => R,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <T1, T2, T3, T4, T5, T6, T7, R>(
    fn7: (arg: T7) => R,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <T1, T2, T3, T4, T5, T6, T7, T8, R>(
    fn8: (arg: T8) => R,
    fn7: (arg: T7) => T8,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(
    fn9: (arg: T9) => R,
    fn8: (arg: T8) => T9,
    fn7: (arg: T7) => T8,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, R>(
    fn10: (arg: T10) => R,
    fn9: (arg: T9) => T10,
    fn8: (arg: T8) => T9,
    fn7: (arg: T7) => T8,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, R>(
    fn11: (arg: T11) => R,
    fn10: (arg: T10) => T11,
    fn9: (arg: T9) => T10,
    fn8: (arg: T8) => T9,
    fn7: (arg: T7) => T8,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, R>(
    fn12: (arg: T12) => R,
    fn11: (arg: T11) => T12,
    fn10: (arg: T10) => T11,
    fn9: (arg: T9) => T10,
    fn8: (arg: T8) => T9,
    fn7: (arg: T7) => T8,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, R>(
    fn13: (arg: T13) => R,
    fn12: (arg: T12) => T13,
    fn11: (arg: T11) => T12,
    fn10: (arg: T10) => T11,
    fn9: (arg: T9) => T10,
    fn8: (arg: T8) => T9,
    fn7: (arg: T7) => T8,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, R>(
    fn14: (arg: T14) => R,
    fn13: (arg: T13) => T14,
    fn12: (arg: T12) => T13,
    fn11: (arg: T11) => T12,
    fn10: (arg: T10) => T11,
    fn9: (arg: T9) => T10,
    fn8: (arg: T8) => T9,
    fn7: (arg: T7) => T8,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, R>(
    fn15: (arg: T15) => R,
    fn14: (arg: T14) => T15,
    fn13: (arg: T13) => T14,
    fn12: (arg: T12) => T13,
    fn11: (arg: T11) => T12,
    fn10: (arg: T10) => T11,
    fn9: (arg: T9) => T10,
    fn8: (arg: T8) => T9,
    fn7: (arg: T7) => T8,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, R>(
    fn16: (arg: T16) => R,
    fn15: (arg: T15) => T16,
    fn14: (arg: T14) => T15,
    fn13: (arg: T13) => T14,
    fn12: (arg: T12) => T13,
    fn11: (arg: T11) => T12,
    fn10: (arg: T10) => T11,
    fn9: (arg: T9) => T10,
    fn8: (arg: T8) => T9,
    fn7: (arg: T7) => T8,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <
    T1,
    T2,
    T3,
    T4,
    T5,
    T6,
    T7,
    T8,
    T9,
    T10,
    T11,
    T12,
    T13,
    T14,
    T15,
    T16,
    T17,
    R
  >(
    fn17: (arg: T17) => R,
    fn16: (arg: T16) => T17,
    fn15: (arg: T15) => T16,
    fn14: (arg: T14) => T15,
    fn13: (arg: T13) => T14,
    fn12: (arg: T12) => T13,
    fn11: (arg: T11) => T12,
    fn10: (arg: T10) => T11,
    fn9: (arg: T9) => T10,
    fn8: (arg: T8) => T9,
    fn7: (arg: T7) => T8,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <
    T1,
    T2,
    T3,
    T4,
    T5,
    T6,
    T7,
    T8,
    T9,
    T10,
    T11,
    T12,
    T13,
    T14,
    T15,
    T16,
    T17,
    T18,
    R
  >(
    fn18: (arg: T18) => R,
    fn17: (arg: T17) => T18,
    fn16: (arg: T16) => T17,
    fn15: (arg: T15) => T16,
    fn14: (arg: T14) => T15,
    fn13: (arg: T13) => T14,
    fn12: (arg: T12) => T13,
    fn11: (arg: T11) => T12,
    fn10: (arg: T10) => T11,
    fn9: (arg: T9) => T10,
    fn8: (arg: T8) => T9,
    fn7: (arg: T7) => T8,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <
    T1,
    T2,
    T3,
    T4,
    T5,
    T6,
    T7,
    T8,
    T9,
    T10,
    T11,
    T12,
    T13,
    T14,
    T15,
    T16,
    T17,
    T18,
    T19,
    R
  >(
    fn19: (arg: T19) => R,
    fn18: (arg: T18) => T19,
    fn17: (arg: T17) => T18,
    fn16: (arg: T16) => T17,
    fn15: (arg: T15) => T16,
    fn14: (arg: T14) => T15,
    fn13: (arg: T13) => T14,
    fn12: (arg: T12) => T13,
    fn11: (arg: T11) => T12,
    fn10: (arg: T10) => T11,
    fn9: (arg: T9) => T10,
    fn8: (arg: T8) => T9,
    fn7: (arg: T7) => T8,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  <
    T1,
    T2,
    T3,
    T4,
    T5,
    T6,
    T7,
    T8,
    T9,
    T10,
    T11,
    T12,
    T13,
    T14,
    T15,
    T16,
    T17,
    T18,
    T19,
    T20,
    R
  >(
    fn20: (arg: T20) => R,
    fn19: (arg: T19) => T20,
    fn18: (arg: T18) => T19,
    fn17: (arg: T17) => T18,
    fn16: (arg: T16) => T17,
    fn15: (arg: T15) => T16,
    fn14: (arg: T14) => T15,
    fn13: (arg: T13) => T14,
    fn12: (arg: T12) => T13,
    fn11: (arg: T11) => T12,
    fn10: (arg: T10) => T11,
    fn9: (arg: T9) => T10,
    fn8: (arg: T8) => T9,
    fn7: (arg: T7) => T8,
    fn6: (arg: T6) => T7,
    fn5: (arg: T5) => T6,
    fn4: (arg: T4) => T5,
    fn3: (arg: T3) => T4,
    fn2: (arg: T2) => T3,
    fn1: (arg: T1) => T2,
  ): (initialArg: T1) => R

  (...fns: Array<(arg: any) => any>): (initialArg: any) => unknown
}
