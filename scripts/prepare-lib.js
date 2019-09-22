const fs = require('fs-extra')

fs.readdirSync('.')
  .filter((item) => !['lib', 'node_modules', 'coverage'].includes(item))
  .forEach((item) => {
    fs.copySync(item, `lib/${item}`)
  })
