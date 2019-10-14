const { multi, method } = require('@arrows/multimethod')

const sayHello = multi((user) => user.lang)

const sayHelloWithDefault = method((user) => `Hello ${user.name}!`)(sayHello)

console.log(
  sayHelloWithDefault({ name: 'Alejandro', lang: 'es' }), // -> 'Hello Alejandro!'
)
