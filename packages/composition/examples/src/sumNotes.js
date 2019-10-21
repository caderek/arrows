const { pipe, tap } = require('../../lib/index')
const { sort, reduce, _rest, _butLast } = require('@arrows/array')

const sumNotes = pipe(
  sort((a, b) => a - b),
  tap(console.log),
  _rest,
  tap(console.log),
  _butLast,
  tap(console.log),
  reduce((a, b) => a + b, 0),
)

const notes = [16, 17.5, 19, 15, 18]

console.log(sumNotes(notes))

/* Output:
[ 15, 16, 17.5, 18, 19 ]
[ 16, 17.5, 18, 19 ]
[ 16, 17.5, 18 ]
51.5
*/
