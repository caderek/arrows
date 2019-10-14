const { multi, method } = require('@arrows/multimethod')

const getHexColor = multi((color) => color)

const extendedGetHexColor = method('red', '#FF0000')(getHexColor)

console.log(
  extendedGetHexColor('red'), // -> '#FF0000'
)
