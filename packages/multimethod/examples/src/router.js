const { multi, method } = require('@arrows/multimethod')

/**
 * Function with case values as ordinary functions.
 * Case value functions will be executed ignoring dispatch function values,
 * and instead operating on raw arguments.
 *
 * It's like each method has its own dispatch function.
 *
 * It is useful when you can't express dispatch in one common function
 * when each case has some specific rule.
 *
 * @param {Object} req
 * @returns {string | Object} response value
 */
const router = multi(
  method(
    (req) => ['GET'].includes(req.method) && req.url === '/',
    'Hello world!',
  ),

  method(
    (req) => ['GET', 'POST'].includes(req.method) && req.url === '/users',
    [{ id: 1, name: 'John' }],
  ),

  method('Oops!'),
)

console.log(
  router({ method: 'GET', url: '/' }), // -> "Hello world!"
  router({ method: 'POST', url: '/' }), // -> "Oops!"
  router({ method: 'GET', url: '/users' }), // -> [{ id: 1, name: "John" }]
)
