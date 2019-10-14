const { multi, method } = require('@arrows/multimethod')

const sayHello = multi((user) => user.lang)

const sayHelloWithDefault = method('Hello!')(sayHello)

console.log(
  sayHelloWithDefault({ name: 'Alejandro', lang: 'es' }), // -> 'Hello!'
)
