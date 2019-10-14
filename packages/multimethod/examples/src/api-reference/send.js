const { multi, method } = require('@arrows/multimethod')

class Email {}
class SMS {}

const send = multi(
  method(Email, 'Sending email...'), // lets add one case to the original multimethod
)

const extendedSend = method(SMS, 'Sending SMS...')(send)

console.log(
  extendedSend(new Email()), // -> 'Sending email...'
  extendedSend(new SMS()), // -> 'Sending SMS...'
)
