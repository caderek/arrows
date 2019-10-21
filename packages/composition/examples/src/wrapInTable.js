const { compose } = require('../../lib/index')
const { map } = require('@arrows/array')

const wrapInTable = compose(
  (rows) => `<table>\n${rows.join('\n')}\n</table>`,
  map((col) => `<tr>${col.join('')}</tr>`),
  compose(
    map,
    map,
  )((cell) => `<td>${cell}</td>`),
)

console.log(wrapInTable([[1, 2], [3, 4]]))

/* Result:
<table>
<tr><td>1</td><td>2</td></tr>
<tr><td>3</td><td>4</td></tr>
</table>
*/
