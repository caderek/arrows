const { multi, method } = require('@arrows/multimethod')

class Email {}
class SMS {}

/**
 * Function with case values as constructors.
 * Matched by strict equality check, followed by instanceof check.
 *
 * @param {Object} message
 * @returns {string} status
 */
const sendMessage = multi(
  method(Email, 'Sending email...'),
  method(SMS, 'Sending SMS...'),
)

console.log(
  sendMessage(new Email()), // -> "Sending email..."
  sendMessage(new SMS()), // -> "Sending SMS..."
)

console.log(
  sendMessage(Email), // -> "Sending email..."
  sendMessage(SMS), // -> "Sending SMS..."
)
