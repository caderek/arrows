const { multi, method, fromMulti } = require('@arrows/multimethod')

/**
 * Save data in a specified format
 *
 * @param {object} data
 * @param {string} format
 * @returns {void}
 */
const save = multi(
  (data, format) => format, // Custom dispatch function

  method('json', (data, format) => {
    console.log('Saving as JSON!')
  }),

  method('html', (data, format) => {
    console.log('Saving as HTML!')
  }),

  method((data, format) => {
    console.log('Default - saving as TXT!')
  }),
)

const data = { name: 'Alice', score: 100 }

save(data, 'json') // -> "Saving as JSON!"
save(data, 'html') // -> "Saving as HTML!"
save(data, 'csv') // -> "Default - saving as TXT!"

const extendedSave = method('csv', (data, format) => {
  console.log('Saving as CSV!')
})(save)

extendedSave(data, 'json') // -> "Saving as JSON!"
extendedSave(data, 'html') // -> "Saving as HTML!"
extendedSave(data, 'csv') // -> "Saving as CSV!"
extendedSave(data, 'yaml') // -> "Default - saving as TXT!"

const extendedSave2 = fromMulti(
  method('csv', (data, format) => {
    console.log('Saving as CSV!')
  }),

  method('yaml', (data, format) => {
    console.log('Saving as YAML!')
  }),
)(save)

extendedSave2(data, 'json') // -> "Saving as JSON!"
extendedSave2(data, 'html') // -> "Saving as HTML!"
extendedSave2(data, 'csv') // -> "Saving as CSV!"
extendedSave2(data, 'yaml') // -> "Saving as YAML!"
