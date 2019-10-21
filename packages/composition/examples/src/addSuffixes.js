const { pipe } = require('../../lib/index')

const addSuffixes = pipe(
  (text) => `${text}-suffix1`,
  (text) => `${text}-suffix2`,
)

console.log(
  addSuffixes('arrows'), // -> "arrows-suffix1-suffix2"
)
