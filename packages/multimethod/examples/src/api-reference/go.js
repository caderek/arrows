const { multi, method } = require('@arrows/multimethod')

class Car {
  drive() {
    return 'driving...'
  }
}

class Human {
  walk() {
    return 'walking...'
  }
}

const is = (prototype) => (value) => value instanceof prototype

const go = multi(
  method(is(Car), (entity) => entity.drive()), // lets add one case to original multimethod
)

const extendedGo = method(is(Human), (entity) => entity.walk())(go)

console.log(
  extendedGo(new Car()), // -> 'driving...'
  extendedGo(new Human()), // -> 'walking...'
)
