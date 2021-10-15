const { multi, method, inspect, _ } = require('@arrows/multimethod')

const mixColors = multi(
  method(['yellow', 'red'], 'orange'),
  method(['black', _], 'black'),
  method(['red', 'blue'], 'purple'),
  method('no idea'),
)

const inspectionObject = inspect(mixColors)

console.dir(inspectionObject.entries, { depth: null })

/* Result:

[
  [ { type: 'data', value: [ 'yellow', 'red' ] }, 'orange' ],
  [
    {
      type: 'mixed',
      values: [ { type: 'data', value: 'black' }, { type: 'wildcard' } ]
    },
    'black'
  ],
  [ { type: 'data', value: [ 'red', 'blue' ] }, 'purple' ],
  [ { type: 'default' }, 'no idea' ]
]

*/

console.dir(inspectionObject.dispatch, { depth: null })

/* Result:

[Function: implicitDispatch]

*/
