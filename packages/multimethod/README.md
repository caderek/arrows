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
4. [API reference](#api)
   - [multi](#multi)
   - [method](#method)
   - [fromMulti](#fromMulti)
5. [License](#license)

## Introduction

Multimethods are functions with superpowers - they can do all what ordinary functions can do, but additionally:

- can chose proper implementation based on the provided arguments, without explicit conditional logic,
- can be easily extended, without the need to modify the original code,
- allow you to write clean, concise and decoupled code.

Multimethod library provides a tiny set of higher-order functions to create powerful, immutable multimethods in a functional way.

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

### Quick example

```js
import { multi, method } from '@arrows/multimethod'

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

save('json') // -> "Saving as JSON!"
save('html') // -> "Saving as HTML!"
save('csv') // -> "Default - saving as TXT!"
```

Let's add a new format, without touching the existing code:

```js
const extendedSave = method('csv', (data, format) => {
  console.log('Saving as CSV!')
})(save)

extendedSave('json') // -> "Saving as JSON!"
extendedSave('html') // -> "Saving as HTML!"
extendedSave('csv') // -> "Saving as CSV!"
extendedSave('yaml') // -> "Default - saving as TXT!"
```

We can also easily extend the original function with multiple methods:

```js
const extendedSave = fromMulti(
  method('csv', (data, format) => {
    console.log('Saving as CSV!')
  }),

  method('YAML', (data, format) => {
    console.log('Saving as YAML!')
  }),
)(save)

extendedSave('json') // -> "Saving as JSON!"
extendedSave('html') // -> "Saving as HTML!"
extendedSave('csv') // -> "Saving as CSV!"
extendedSave('yaml') // -> "Saving as YAML!"
```

In both cases, the original `save` function remains intact.

That's just a simple example, you can do much more!

## API

### multi

Creates multimethod - a function that can dynamically choose proper implementation,
based on arbitrary dispatch of its arguments

#### Parameters

- `dispatch` - The function that calculates values for matching
- `methods` - Arbitrary number of partially applied methods

#### Returns

- Returns an immutable multimethod that can be used as an ordinary function

#### Interface

```
(dispatch?, method1?, method2?, ..., methodN?) => multimethod
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

### fromMulti

Allows to create new multimethods from existing ones in a simple way.

#### Parameters

- `methods` - Arbitrary number of partially applied methods
- `multimethod` - Multimethod on which you want to base new multimethod

#### Returns

- New multimethod (the base one is unchanged)

#### Interface

```
(method1, method2?, ..., methodN?) => (multimethod) => new_multimethod
```

#### Examples

Create new multimethod using existing one as a base:

```javascript
const add = multi(
  (a, b) => [typeof a, typeof b],
  method(['number', 'number'], (a, b) => a + b),
  method(['string', 'string'], (a, b) => `${a}${b}`),
)

const extendedAdd = fromMulti(
  method(['bigint', 'bigint'], (a, b) => a + b),
  method(['number', 'bigint'], (a, b) => BigInt(a) + b),
  method(['bigint', 'number'], (a, b) => a + BigInt(b)),
)(add)

extendedAdd(1, 2) // -> 3
extendedAdd('foo', 'bar') // -> 'foobar'
extendedAdd(2n, 3n) // -> 5n
extendedAdd(5, 5n) // -> 10n
extendedAdd(9n, 2) // -> 11n
```

## License

Project is under open, non-restrictive [ISC license](LICENSE).
