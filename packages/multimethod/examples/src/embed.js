const { multi, method } = require('@arrows/multimethod')

class Article {}
class Recipe {}

class PDF {}
class HTML {}

/**
 * Function with case values as constructors wrapped in an array - special case.
 *
 * If the case value is an array, matching algorithm will check if the array
 * contains constructors. If that's the case, then these constructors will be
 * matched using constructor algorithm, other values of the array
 * will be matched using a deep strict equal algorithm.
 *
 * The algorithm, by design, checks for constructors only the first-layer array.
 *
 * It can be very useful, for example as a trivial alternative
 * to otherwise complex visitor patter.
 *
 * @param {Object} document
 * @param {Object} template
 * @returns {string} embedding description
 */
const embed = multi(
  method([Article, PDF], 'Embedding article inside PDF'),
  method([Article, HTML], 'Embedding article inside HTML'),
  method([Recipe, PDF], 'Embedding recipe inside PDF'),
  method([Recipe, HTML], 'Embedding recipe inside HTML'),
)

console.log(
  embed(new Article(), new PDF()), // -> "Embedding article inside PDF"
  embed(new Recipe(), new HTML()), // -> "Embedding recipe inside HTML"
)
