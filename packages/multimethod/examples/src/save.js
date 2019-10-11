const { multi, method, fromMulti } = require('@arrows/multimethod')

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

save('some data', 'json') // -> "Saving as JSON!"
save('some data', 'html') // -> "Saving as HTML!"
save('some data', 'csv') // -> "Default - saving as TXT!"

const extendedSave = method('csv', (data, format) => {
  console.log('Saving as CSV!')
})(save)

extendedSave('some data', 'json') // -> "Saving as JSON!"
extendedSave('some data', 'html') // -> "Saving as HTML!"
extendedSave('some data', 'csv') // -> "Saving as CSV!"
extendedSave('some data', 'yaml') // -> "Default - saving as TXT!"

const extendedSave2 = fromMulti(
  method('csv', (data, format) => {
    console.log('Saving as CSV!')
  }),

  method('yaml', (data, format) => {
    console.log('Saving as YAML!')
  }),
)(save)

extendedSave2('some data', 'json') // -> "Saving as JSON!"
extendedSave2('some data', 'html') // -> "Saving as HTML!"
extendedSave2('some data', 'csv') // -> "Saving as CSV!"
extendedSave2('some data', 'yaml') // -> "Saving as YAML!"
