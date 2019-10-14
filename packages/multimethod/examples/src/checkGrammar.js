const { multi, method } = require('@arrows/multimethod')

/**
 * Manually chunked function - chunks can have more than one argument,
 * they can also have default values.
 *
 * Note that you can still use non-functions as corresponding values.
 */
const checkGrammar = multi(
  (config = {}) => (text, language) => language,
  method('en', 'Checking English grammar'),
  method('pl', 'Checking Polish grammar'),
)

const checkTypos = checkGrammar({ typos: true })

console.log(
  checkTypos('mistkae', 'en'), // -> "Checking English grammar"
  checkTypos('błąt', 'pl'), // -> "Checking Polish grammar"
)
