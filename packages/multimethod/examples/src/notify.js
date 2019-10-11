const { multi, method } = require('@arrows/multimethod')

const VIPs = ['john@vip.com', 'alice@vip.com']

/**
 * Function with case values of different types.
 *
 * @param {Object} msg
 * @returns {string | Object} response value
 */
const notify = multi(
  (msg) => msg.type,

  method(
    (msg) => msg.type === 'email' && VIPs.includes(msg.email),
    'Email from VIP!',
  ),

  method('email', (msg) => `Email from ${msg.email}!`),
  method('sms', (msg) => `SMS from ${msg.number}!`),
)

console.log(
  notify({ type: 'email', email: 'alice@vip.com' }), // -> "Email from VIP!"
  notify({ type: 'email', email: 'joe@ab.com' }), // -> "Email from joe@ab.com!"
  notify({ type: 'sms', number: '123456789' }), // -> "SMS from 123456789!"
)
