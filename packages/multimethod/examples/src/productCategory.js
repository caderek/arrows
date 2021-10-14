const { multi, method } = require('@arrows/multimethod')
/**
 * Function with case values as regular expressions.
 * Matched by RegExp.prototype.test() method
 *
 * @param {RegExp} pattern
 * @returns {string} type
 */
const productCategory = multi(
  method(/wine/, 'wine'),
  method(/cheese/, 'cheese'),
  method(/bread/, 'bread'),
)

console.log(
  productCategory('blue cheese'), // -> "cheese"
  productCategory('red wine'), // -> "wine"
  productCategory('white wine from Germany'), // -> "wine"
  productCategory('breadcrumbs'), // -> "bread"
)
