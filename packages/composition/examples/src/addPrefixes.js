const { compose } = require('../../lib/index')

const addPrefixes = compose(
  (text) => `prefix1-${text}`,
  (text) => `prefix2-${text}`,
)

console.log(
  addPrefixes('arrows'), // -> "prefix1-prefix2-arrows"
)
