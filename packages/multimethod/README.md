# @arrows/multimethod

![npm (scoped)](https://img.shields.io/npm/v/@arrows/multimethod)
![CircleCI](https://img.shields.io/circleci/build/github/caderek/arrows)
![David (path)](https://img.shields.io/david/caderek/arrows?path=packages%2Fmultimethod)
![Codecov](https://img.shields.io/codecov/c/github/caderek/arrows?token=c6adb715d638431786fefe69ca08ab00)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@arrows/multimethod)
![GitHub](https://img.shields.io/github/license/caderek/arrows)

## Table of contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
   - [Quick example](#quick-example)
   - [Anatomy of the multimethod](#anatomy-of-the-multimethod)
     - [Dispatch function](#dispatch-function)
     - [Case value](#case-value)
     - [Corresponding value](#corresponding-value)
   - [Extending multimethods](#extending-multimethods)
     - [Extending with a single method](#extending-with-a-single-method)
     - [Extending with multiple methods](#extending-with-multiple-methods)
   - [Methods priority](#methods-priority)
4. [API reference](#api-reference)
   - [multi](#multi)
   - [method](#method)
5. [License](#license)

## Introduction

Multimethods are functions with superpowers - they can do all what ordinary functions can do, but additionally:

- can chose proper implementation based on the provided arguments, without explicit conditional logic,
- can be easily extended, without the need to modify the original code,
- allow you to write clean, concise and decoupled code.

Multimethod library provides a tiny set of higher-order functions to create powerful, immutable multimethods - in a functional way.

The library has **built-in type definitions**, which provide an excellent IDE support.

## Installation

Via NPM:

```sh
npm i @arrows/multimethod
```

Via Yarn:

```sh
yarn add @arrows/multimethod
```

## Usage

_Note: You can find an run all the examples from this section in the [examples/](examples/) folder._

### Quick example

```js
import { multi, method } from '@arrows/multimethod'

/**
 * Save data in specified format
 *
 * @param {string} data
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

save('some data', 'json') // -> "Saving as JSON!"
save('some data', 'html') // -> "Saving as HTML!"
save('some data', 'csv') // -> "Default - saving as TXT!"
```

Let's add a new format, without touching the existing code:

```js
const extendedSave = method('csv', (data, format) => {
  console.log('Saving as CSV!')
})(save)

extendedSave('some data', 'json') // -> "Saving as JSON!"
extendedSave('some data', 'html') // -> "Saving as HTML!"
extendedSave('some data', 'csv') // -> "Saving as CSV!"
extendedSave('some data', 'yaml') // -> "Default - saving as TXT!"
```

We can also easily extend the original function with multiple methods:

```js
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
```

In both cases, the original `save` function remains intact.

That's just a simple example, you can do much more!

### Anatomy of the multimethod

```js
const myFunction = multi(
  optional_dispatch_function,

  method(optional_case_value, corresponding_value),

  ...other_methods,
)
```

#### Dispatch function

Dispatch function produces values, by which multimethod should be dispatched. The return value of the dispatch function is compared with case values of registered methods.

Matching algorithm uses deep strict equality to find the match. There are two exceptions to this rule, they are described in the [case value](#case-value) section.

_Note: Current implementation of the deep strict equal algorithms guarantees the correct results for JSON compatible types, it may be later extended to also handle other types like `Map`, `Set` etc._

If you do not provide a dispatch function, the default one will be used. Default dispatch function returns all arguments as an array, or in case of single argument - as a standalone value.

Examples:

```js
/**
 * Function with single argument,
 * default dispatch will return that argument as-is.
 *
 * @param {string} color
 * @returns {string} hex color
 */
const colorToHex = multi(
  method('red', '#ff0000'),
  method('green', '#00ff00'),
  method('blue', '#0000ff'),
)

colorToHex('green') // -> "#00ff00"
```

```js
/**
 * Function with multiple arguments,
 * default dispatch will return the array of arguments.
 *
 * Note that the order of the arguments do matter,
 * so if you want the example to work for each combination,
 * you either have to provide methods for reversed arguments,
 * or add your custom dispatch function,
 * which returns sorted values (better option).
 *
 * @param {string} colorA
 * @param {string} colorB
 * @returns {string} the resulting color
 */
const mixLights = multi(
  method(['red', 'green'], 'yellow'),
  method(['red', 'blue'], 'magenta'),
  method(['green', 'blue'], 'cyan'),
)

mixLights('red', 'blue') // -> "magenta"
mixLights('blue', 'red') // -> throws an error
```

```js
/**
 * Function with custom dispatch.
 * More flexible version of the previous example.
 *
 * @param {string} colorA
 * @param {string} colorB
 * @returns {string} the resulting color
 */
const mixLights = multi(
  (colorA, colorB) => [colorA, colorB].sort(), // custom dispatch
  method(['green', 'red'], 'yellow'),
  method(['blue', 'red'], 'magenta'),
  method(['blue', 'green'], 'cyan'),
)

mixLights('red', 'blue') // -> "magenta"
mixLights('blue', 'red') // -> "magenta"
```

```js
const store = {
  add(text) {
    console.log('todo added')
  },
  remove(id) {
    console.log('todo removed')
  },
  toggle(id) {
    console.log('todo toggled')
  },
}

/**
 * Function with custom dispatch.
 * Dispatch function can produce any arbitrary value.
 *
 * @param {Object} action
 * @param {Object} store
 * @returns {void}
 */
const handleAction = multi(
  (action, store) => action.type, // custom dispatch
  method('ADD_TODO', (action, store) => store.add(action.text)),
  method('REMOVE_TODO', (action, store) => store.remove(action.id)),
  method('TOGGLE_TODO', (action, store) => store.toggle(action.id)),
)

handleAction({ type: 'ADD_TODO', text: 'Eat banana.' }, store) // -> "todo added"
handleAction({ type: 'TOGGLE_TODO', id: 0 }, store) // -> "todo toggled"
```

_Note: If you are interested in Redux-like actions handling, check out [redux-multimethod](https://www.npmjs.com/package/redux-multimethod) package._

#### Case value

Case value is a first argument of the two-argument `method` (if you provide only one argument for to the `method`, it will be treated as default case).

Case value can be either:

1. an ordinary function
2. a constructor / class
3. any other value

If the case value is neither a function, nor a constructor, it will be matched against the result of the dispatch function using deep strict equal algorithm.

If the case value is a constructor (can be inside an array, more in the examples),
it will be matched against the result of the dispatch function by strict equality (`===`) operator,
and if that fails - by the `instanceof` operator.

If the case value is an ordinary function, the dispatch function will be ignored,
and case value function will be executed with all provided arguments. Case value function should return a boolean value (or at least the output will be treated as such).
If the return value is truthy, then we have a match.

You can mix all case value types in one multimethod.

Examples:

```js
/**
 * Function with case values as ordinary values.
 * Values can be any JSON-compatible, arbitrary nested structure, or primitive.
 * Matched by deep strict equal algorithm.
 *
 * @param {Object} player
 * @returns {string} greeting
 */
const greet = multi(
  method({ name: 'John', age: '30' }, 'Hello John!'),
  method({ name: 'Jane', age: '25' }, 'Hi Jane!'),
  method('Howdy stranger!'),
)

greet({ name: 'John', age: '30' }) // -> "Hello John!"
greet({ name: 'Jane', age: '25' }) // -> "Hi Jane!"
greet({ name: 'Jane', age: '40' }) // -> "Howdy stranger!"
```

```js
class Email {}
class SMS {}

/**
 * Function with case values as constructors.
 * Matched by strict equality check, followed by instanceof check.
 *
 * @param {Object} message
 * @returns {string} status
 */
const sendMessage = multi(
  method(Email, 'Sending email...'),
  method(SMS, 'Sending SMS...'),
)

sendMessage(new Email()) // -> "Sending email..."
sendMessage(new SMS()) // -> "Sending SMS..."

sendMessage(Email) // -> "Sending email..."
sendMessage(SMS) // -> "Sending SMS..."
```

```js
class Article {}
class Recipe {}

class PDF {}
class HTML {}

/**
 * Function with case values as constructors wrapped in an array - special case.
 *
 * If the case value is an array, matching algorithm will check if the array
 * contains constructors. If that's the case, then these constructors will be
 * matched using constructor algorithm, other values of the array
 * will be matched using a deep strict equal algorithm.
 *
 * The algorithm, by design, checks for constructors only the first-layer array.
 *
 * It can be very useful, for example as a trivial alternative
 * to otherwise complex visitor patter.
 *
 * @param {Object} document
 * @param {Object} template
 * @returns {string} embedding description
 */
const embed = multi(
  method([Article, PDF], 'Embedding article inside PDF'),
  method([Article, HTML], 'Embedding article inside HTML'),
  method([Recipe, PDF], 'Embedding recipe inside PDF'),
  method([Recipe, HTML], 'Embedding recipe inside HTML'),
)

embed(new Article(), new PDF()) // -> "Embedding article inside PDF"
embed(new Recipe(), new HTML()) // -> "Embedding recipe inside HTML"
```

```js
/**
 * Function with case values as ordinary functions.
 * Case value functions will be executed ignoring dispatch function values,
 * instead operating on raw arguments.
 *
 * It's like each method has its own dispatch function.
 *
 * It is useful, when you can't express a dispatch in one common function,
 * when each case has some specific rule.
 *
 * @param {Object} req
 * @returns {string | Object} response value
 */
const router = multi(
  method(
    (req) => ['GET'].includes(req.method) && req.url === '/',
    'Hello world!',
  ),

  method(
    (req) => ['GET', 'POST'].includes(req.method) && req.url === '/users',
    [{ id: 1, name: 'John' }],
  ),

  method('Oops!'),
)

router({ method: 'GET', url: '/' }) // -> "Hello world!"
router({ method: 'POST', url: '/' }) // -> "Oops!"
router({ method: 'GET', url: '/users' }) // -> [{ id: 1, name: "John" }]
```

```js
const VIPs = ['john@vip.com', 'alice@vip.com']

/**
 * Function with case values of different types.
 *
 * @param {Object} msg
 * @returns {string | Object} response value
 */
const notify = multi(
  (msg) => msg.type,

  method(
    (msg) => msg.type === 'email' && VIPs.includes(msg.email),
    'Email from VIP!',
  ),

  method('email', (msg) => `Email from ${msg.email}!`),
  method('sms', (msg) => `SMS from ${msg.number}!`),
)

notify({ type: 'email', email: 'alice@vip.com' }) // -> "Email from VIP!"
notify({ type: 'email', email: 'joe@ab.com' }) // -> "Email from joe@ab.com!"
notify({ type: 'sms', number: '123456789' }) // -> "SMS from 123456789!"
```

#### Corresponding value

Corresponding value is a second argument of the two-argument `method` (or the first and ony argument of the default method).

Corresponding value can be either:

1. a function
2. any other value

If the corresponding value is a function, it will be executed with passed arguments when its case value is matching.

If the corresponding value is not a function, it will be returned when its case value is matching.

There are many examples already, but here's another one:

```js
/**
 * Classic recursive fibonacci.
 * Do not use it for big numbers.
 *
 * As you can see, recursion works just like with ordinary functions.
 *
 * @param {number} n
 * @returns {number} Nth element of fibonacci sequence
 */
const fib = multi(
  method(0, 0),
  method(1, 1),
  method((n) => fib(n - 1) + fib(n - 2)),
)

fib(0) // -> 0
fib(1) // -> 1
fib(9) // -> 34
```

### Extending multimethods

The multimethod is immutable, so we can't add / override methods, but we can easily create a new multimethod based on the existing one. In fact, every time we execute the `method` function, we create a new multimethod. This multimethod will have all cases the old one has, plus the new method (you can also "replace" a method by using the same caseValue as an existing one).

#### Extending with a single method

You can create a new multimethod with new method by executing `method` function and passing a base multimethod as an argument to the second chunk.

Examples:

```js
const baseAdd = multi(
  (a, b) => [typeof a, typeof b],
  method(['number', 'number'], (a, b) => a + b),
  method(['string', 'string'], (a, b) => `${a}${b}`),
)

/**
 * Creating a new multimethod with additional method
 */
const add = method(['bigint', 'bigint'], (a, b) => a + b)(baseAdd)

add(1, 2) // -> 3
add('bat', 'man') // -> "batman"
add(1n, 2n) // -> 3n
```

```js
const { multi, method } = require('@arrows/multimethod')

/**
 * @param {string} language
 * @returns ${string} greeting
 */
const baseGreet = multi(
  method('ru', 'Привет!'),
  method('es', '¡Hola!'),
  method('pl', 'Cześć!'),
)

/**
 * Creating a new multimethod with added default method
 */
const greet = method('Hello!')(baseGreet)

greet('ru') // -> "Привет!"
greet('es') // -> "¡Hola!"
greet('pl') // -> "Cześć!"
greet('fr') // -> "Hello!"
```

#### Extending with multiple methods

You can create a new multimethod with multiple new methods either by generic `compose` function, or by passing an old multimethod as a first argument to the `multi` function (instead of a dispatch function).

Examples:

```js
const baseHandleHTTPError = multi(
  method(400, 'Incorrect request.'),
  method(404, 'The path does not exist.'),
)

/**
 * Creating a new multimethod with many new methods via generic functional compose
 */
const handleHTTPError = compose(
  method(403, 'You do not have access to this resource.'),
  method(418, 'We are all teapots!'),
)(baseHandleHTTPError)

handleHTTPError(400) // -> "Incorrect request."
handleHTTPError(418) // -> "We are all teapots!"
```

```js
const baseArea = multi(
  (shape) => shape.type,
  method('rectangle', (shape) => shape.a * shape.b),
  method('square', (shape) => shape.a ** 2),
)

/**
 * Creating a new multimethod with many new methods via fromMulti function
 */
const area = multi(
  baseArea,
  method('circle', (shape) => Math.PI * shape.r ** 2),
  method('triangle', (shape) => 0.5 * shape.a * shape.h),
)

area({ type: 'square', a: 5 }) // -> 25
area({ type: 'circle', r: 3 }) // -> 28.274333882308138
```

### Methods priority

When you execute the `method` function, the method will be added to the front of the multimethod. In case of the partially applied `method` functions passed to the `multi` function, they will be added from bottom to top - so they will maintain their order in a final multimethod.

Order of the methods inside a multimethod determines their priority.

Examples:

```js
/** Priorities for methods inside `evenMoreExtended` function */

const base = multi(
  method('a', 'priority: 5'),
  method('b', 'priority: 6'),
  method('c', 'priority: 7'),
)

const extended = method('d', 'priority: 4')(base)

const evenMoreExtended = fromMulti(
  extended,
  method('e', 'priority: 1'),
  method('f', 'priority: 2'),
  method('g', 'priority: 3'),
)
```

```js
/**
 * @param {number} points
 * @returns {number} grade
 */
const baseGradeExam = multi(
  method((points) => points < 10, 'failed'),
  method((points) => points <= 15, 'ok'),
  method((points) => points > 15, 'good'),
)

const gradeExam = multi(
  baseGradeExam,
  method((points) => points === 0, 'terrible'),
  method((points) => points > 20, 'excellent'),
)

gradeExam(0) // -> 'terrible'
gradeExam(5) // -> 'failed'
gradeExam(10) // -> 'ok'
gradeExam(15) // -> 'ok'
gradeExam(20) // -> 'good'
gradeExam(25) // -> 'excellent'
```

<!-- ### Rearranging multimethods

If some rare situations you would want to arbitrarily rearrange methods,
without changing the original function.

Unlike in some other multimethod implementations,
there is no special syntax for that - you can do that by simply
creating a new multimethod with rearranged your methods.

In order to do that (without hacks), a module should export not only a multimethod,
but also specific implementations (at least the potentially problematic ones). **If you create a library that uses multimethods, pay a special attention to this.**

It can be more verbose, but it's more explicit, and easy to understand.

Lets say that we have the following original implementation:

```js
// original.js
import { multi, method } from '@arrows/multimethod'

export const whenBat = () => 'Talking about bats.'
export const whenBatman = () => 'Talking about Batman.'
export const whenDog = () => 'Talking about dogs.'
export const whenCat = () => 'Talking about cats.'

/**
 * @param {string} phrase
 * @returns {string} conclusion
 */
const original = multi(
  (phrase) => phrase.toLoweCase(),
  method((phrase) => phrase.includes('bat'), whenBat),
  method((phrase) => phrase.includes('batman'), whenBatman),
  method((phrase) => phrase.includes('dog'), whenDog),
  method((phrase) => phrase.includes('cat'), whenCat),
)

export default original
```

Now we can rearrange implementations by creating a new multimethod,
we can do this in two ways - it depends weather we care about keeping a default method
open for future changes or not.

In the vast majority of the cases, we're good with delegating methods that we do not care about to the original function via default method:

```js
import { multi, method } from '@arrows/multimethod'
import original, { whenBat, whenBatman } from './original'

/**
 * @param {string} phrase
 * @returns {string} conclusion
 */
const rearranged = multi(
  method((phrase) => phrase.includes('batman'), whenBatman),
  method((phrase) => phrase.includes('bat'), whenBat),
  method(original),
)

original('I like Batman!') // -> "Talking about bats"
original('Dracula can turn into a bat') // -> "Talking about bats"

rearranged('I like Batman!') // -> "Talking about Batman"
rearranged('Dracula can turn into a bat') // -> "Talking about bats"
rearranged('My dogs are lazy.') // -> "Talking about dogs"
rearranged('My cat is crazy.') // -> "Talking about cats"
```

If we need to keep the default method open, we have to be more verbose, specifying all the cases:

```js
import { multi, method } from '@arrows/multimethod'
import original, { whenBat, whenBatman, whenCat, whenDog } from './original'

/**
 * @param {string} phrase
 * @returns {string} conclusion
 */
const rearranged = multi(
  method((phrase) => phrase.includes('batman'), whenBatman),
  method((phrase) => phrase.includes('bat'), whenBat),
  method((phrase) => phrase.includes('dog'), whenDog),
  method((phrase) => phrase.includes('cat'), whenCat),
)

original('I like Batman!') // -> "Talking about bats"
original('Dracula can turn into a bat') // -> "Talking about bats"

rearranged('I like Batman!') // -> "Talking about Batman"
rearranged('Dracula can turn into a bat') // -> "Talking about bats"
rearranged('My dogs are lazy.') // -> "Talking about dogs"
rearranged('My cat is crazy.') // -> "Talking about cats"
``` -->

## API reference

### multi

Creates multimethod - a function that can dynamically choose proper implementation,
based on arbitrary dispatch of its arguments

#### Parameters

- `first` - First argument can be either dispatch function, multimethod or partially applied method
- `methods` - Arbitrary number of partially applied methods (optional)

#### Returns

- Returns an immutable multimethod that can be used as an ordinary function

#### Interface

```
(dispatch | multimethod | method, method?, method?, ..., method?) => multimethod
```

#### Examples

Create multimethod with a custom dispatch and no methods:

```javascript
const fn = multi((x) => typeof x)

fn('foo') // -> throws an Error (because of no matching methods), but useful as a base for extensions
```

Create multimethod with the default dispatch and some methods:

```javascript
const makeSound = multi(
  method('cat', () => 'Meow!'),
  method('dog', () => 'Woof!'),
  method(() => 'Hello!'), // default method (ony one argument provided)
)

makeSound('cat') // -> 'Meow!'
makeSound('dog') // -> 'Woof!'
makeSound('cow') // -> 'Hello!' (that's a rather unusual cow)
```

Create multimethod with a custom dispatch and some methods:

```javascript
const multiply = multi(
  (multiplier, x) => [typeof multiplier, typeof x],
  method(['number', 'number'], (multiplier, x) => x * multiplier),
  method(['number', 'string'], (multiplier, x) => x.repeat(multiplier)),
)

multiply(2, 5) // -> 10
multiply(3, 'Beetlejuice! ') // -> 'Beetlejuice! Beetlejuice! Beetlejuice! ' (do not read it out loud)
multiply(2, [1, 2, 3]) // -> throws an Error (no match and no default method for these arguments)
```

Create a new multimethod using an existing one as a base:

```javascript
const add = multi(
  (a, b) => [typeof a, typeof b],
  method(['number', 'number'], (a, b) => a + b),
  method(['string', 'string'], (a, b) => `${a}${b}`),
)

const extendedAdd = multi(
  add,
  method(['bigint', 'bigint'], (a, b) => a + b),
  method(['number', 'bigint'], (a, b) => BigInt(a) + b),
  method(['bigint', 'number'], (a, b) => a + BigInt(b)),
)

extendedAdd(1, 2) // -> 3
extendedAdd('foo', 'bar') // -> 'foobar'
extendedAdd(2n, 3n) // -> 5n
extendedAdd(5, 5n) // -> 10n
extendedAdd(9n, 2) // -> 11n
```

### method

Adds method to a multimethod

#### Parameters

- `caseValue` - The value to which the result of dispatch function is matched

  - if function, then is executed with input arguments (always unchunked, even if dispatch is chunked,
  - if constructor, then is matched by reference value first, if that fails, by instanceof operator.

- `correspondingValue` - The value that function should return on matching case

  - if function, then is executed with input arguments (chunked or unchunked, depending on the dispatch function)

- `multimethod` - Multimethod on which you want to base the new multimethod

#### Returns

- New multimethod (the base one is unchanged)

#### Interface

```
(caseValue?, correspondingValue) => (multimethod) => new_multimethod
```

#### Examples

Default method as function:

```javascript
const sayHello = multi((user) => user.lang)

const sayHelloWithDefault = method((user) => `Hello ${usr.name}!`)(sayHello)

sayHelloWithDefault({ name: 'Alejandro', lang: 'es' }) // -> 'Hello Alejandro!'
```

Default method as other value:

```javascript
const sayHello = multi(() => user.lang)

const sayHelloWithDefault = method('Hello!')(sayHello)

sayHelloWithDefault({ name: 'Alejandro', lang: 'es' }) // -> 'Hello!'
```

Case method with caseValue as ordinary value and correspondingValue as a function:

```javascript
const add = multi((a, b) => [typeof a, typeof b])

const extendedAdd = method(['number', 'number'], (a, b) => a + b)(add)

extendedAdd(1, 2) // -> 3
```

Case method with caseValue and correspondingValue as ordinary values:

```javascript
const getHexColor = multi() // Uses default dispatch

const extendedGetHexColor = method('red', '#FF0000')(getHexColor)

extendedGetHexColor('red') // -> '#FF0000'
```

Case method with caseValue as a function and correspondingValue as ordinary value:

```javascript
class Enemy {}
const is = (prototype) => (value) => value instanceof prototype

const greet = multi() // Uses default dispatch

// Matches, when case function executed with initial arguments returns truthy value
const extendedGreet = method(is(Enemy), 'Goodbye!')(greet)

extendedGreet(new Enemy()) // -> 'Goodbye!'
```

Case method with caseValue and correspondingValue as functions:

```javascript
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

extendedGo(new Car()) // -> 'driving...'
extendedGo(new Human()) // -> 'walking...'
```

Case method with caseValue as a constructor:

```javascript
class Email {}
class SMS {}

const fn = multi(
  method(Email, 'email'), // lets add one case to original multimethod
)

const extendedFn = method(SMS, 'sms')(go)

extendedFn(new Email()) // -> 'email'
extendedFn(new SMS()) // -> 'sms'
```

## License

Project is under open, non-restrictive [ISC license](LICENSE).
