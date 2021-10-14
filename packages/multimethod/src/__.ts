const _skip = Symbol('skip')
const _not = Symbol('not')
const _in = Symbol('in')
const _notIn = Symbol('notIn')

type Skip = { type: symbol }
type Not = { type: symbol; value: any }
type In = { type: symbol; values: any[] }
type NotIn = { type: symbol; values: any[] }

type Placeholder = Skip & {
  not: (vale: any) => Not
  in: (...values: any[]) => In
  notIn: (...values: any[]) => NotIn
}

const _ = { type: _skip }

/**
 * Wildcard - accepts any value (skips the check).
 *
 * It has helper methods that modify the check:
 *   .not(val)
 *   .in(val1, val2, ..., valN)
 *   .notIn(val1, val2, ..., valN)
 *
 * @example
 *
 * method(__, 'always true')
 *
 * method([__, 'foo'], 'only foo will be checked')
 */
const __: Placeholder = Object.assign(_, {
  /**
   * Matches argument that does not strict equal (===) to the provided value.
   *
   * @param value any value
   * @returns boolean
   *
   * @example
   *
   * multi(
   *   (a, b) => typeof a,
   *   method(__.not('number'), () => {
   *     throw new Error('Invalid first argument')
   *   }),
   *   method((a, b) => 'OK!'),
   * )
   *
   * multi(
   *   (a, b) => [typeof a, typeof b],
   *   method(['string', __.not('number')], () => {
   *     throw new Error('Invalid second argument')
   *   }),
   *   method((a, b) => 'OK!'),
   * )
   */
  not(value: any) {
    return { type: _not, value }
  },
  /**
   * Matches argument that is within provided values.
   *
   * @param value any value
   * @returns boolean
   *
   * @example
   *
   * multi(
   *   (a, b) => typeof a,
   *   method(__.in('number', 'bigint'), () => {
   *     throw new Error('Invalid first argument')
   *   }),
   *   method((a, b) => 'OK!'),
   * )
   *
   * multi(
   *   (a, b) => [typeof a, typeof b],
   *   method(['string', __.in('number', 'bigint')], () => {
   *     throw new Error('Invalid second argument')
   *   }),
   *   method((a, b) => 'OK!'),
   * )
   */
  in(...values: any[]) {
    return { type: _in, values }
  },
  /**
   * Matches argument that is not within provided values.
   *
   * @param value any value
   * @returns boolean
   *
   * @example
   *
   * multi(
   *   (a, b) => typeof a,
   *   method(__.notIn('string', 'number'), () => {
   *     throw new Error('Invalid first argument')
   *   }),
   *   method((a, b) => 'OK!'),
   * )
   *
   * multi(
   *   (a, b) => [typeof a, typeof b],
   *   method(['string', __.notIn('string', 'number')], () => {
   *     throw new Error('Invalid second argument')
   *   }),
   *   method((a, b) => 'OK!'),
   * )
   */
  notIn(...values: any[]) {
    return { type: _notIn, values }
  },
})

export { _skip, _not, _in, _notIn }
export default __
