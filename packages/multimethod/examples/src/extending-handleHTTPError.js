const { multi, method } = require('@arrows/multimethod')
const { compose } = require('@arrows/composition')

const baseHandleHTTPError = multi(
  method(400, 'Incorrect request.'),
  method(404, 'The path does not exist.'),
)

/**
 * Creating a new multimethod with many new methods via generic functional compose
 */
const handleHTTPError = compose(
  method(403, 'You do not have access to this resource.'),
  method(418, 'We are all teapots!'),
)(baseHandleHTTPError)

console.log(
  handleHTTPError(400), // -> "Incorrect request"
  handleHTTPError(418), // -> "We are all teapots!"
)
