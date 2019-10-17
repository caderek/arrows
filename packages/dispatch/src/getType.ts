/**
 * Returns the type of a value (using the internal `[[Class]]` property).
 *
 * It does not return custom prototypes - if you need that, use `is` function.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#Using_toString_to_detect_object_class
 * @see `types` module for the most common values
 */
const getType = (value: any): string => {
  const rawType = Object.prototype.toString.call(value).slice(8, -1)

  // Special case - it is more useful to not distinguish
  // between async and ordinary functions - both can return a promise.
  return rawType === 'AsyncFunction' ? 'Function' : rawType
}

export { getType }
export default getType
