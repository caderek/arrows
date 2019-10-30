# @arrows/composition

![npm (scoped)](https://img.shields.io/npm/v/@arrows/composition)
![CircleCI](https://img.shields.io/circleci/build/github/caderek/arrows)
![David (path)](https://img.shields.io/david/caderek/arrows?path=packages%2Fcomposition)
![Codecov](https://img.shields.io/codecov/c/github/caderek/arrows?token=c6adb715d638431786fefe69ca08ab00)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@arrows/composition)
![GitHub](https://img.shields.io/github/license/caderek/arrows)

## Table of contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [API reference](#api-reference)
   - [chain](#chain)
   - [chainRight](#chainRight)
   - [compose](#compose)
   - [curry](#curry)
   - [pipe](#pipe)
   - [rail](#rail)
   - [rail.async](#rail.async)
   - [railRight](#railRight)
   - [railRight.async](#railRight.async)
   - [tap](#tap)
4. [License](#license)

## Introduction

The library contains a collection of higher-order functions for composing your applications with reusable functions.

All chain-like functions are manually chunked (segmented). It is a deliberate decision (to not use automatic currying) to allow a function to accept a variadic number of arguments in a segment, which leads in my opinion to a nicer to use API (and is faster as a bonus).

The library has **built-in type definitions**, which provide an excellent IDE support.

## Installation

Via NPM:

```sh
npm i @arrows/composition
```

Via Yarn:

```sh
yarn add @arrows/composition
```

All modules can be imported independently (to reduce bundle size), here are some import methods (you can use either CommonJS or ES modules):

```js
import composition from '@arrows/composition'
```

```js
import { pipe } from '@arrows/composition'
```

```js
import pipe from '@arrows/composition/pipe'
```

## API reference

### chain

Allows you to build your own, chain-like functions

Executes provided functions from left to right, passing the result from one function to the other. Accepts a wrapping function which can execute additional instructions before executing each passed function.

#### Parameters

Arguments listed below have to be passed separately, as segments.

- `wrappingFn` - two-argument function thats is responsible for executing each function in a chain.

- `...fns` - an arbitrary number of one-argument functions to be executed in a chain

- `initialArg` - initial argument, passed to the first function in a chain (through a wrapping function)

Arguments of a wrapping function:

- `fn` - function in a chain

- `input` - current value

- `isLast` - boolean flag indicating if a function is a last one in a chain

#### Returns

- Returns a final value.

#### Interface

```
(wrapping_function) => (fn, fn?, ..., fn?) => (initial_value) => result
```

#### Examples

```javascript
const { chain } = require('@arrows/composition')

// Create custom wrapping function:
const wrappingFn = (fn, input) => {
  console.log(input)
  return fn(input)
}

// Create reusable chain-like function:
const pipeWithLog = chain(wrappingFn)

// Create concrete function
const calculate = pipeWithLog((x) => x + 1, (x) => x * 2)

console.log(calculate(0))

// -> 0
// -> 1
// -> 2 (final result)
```

---

### chainRight

Works like [chain](#chain), but executes functions from right to left.

#### Parameters

Arguments listed below have to be passed separately, as segments.

- `wrappingFn` - two-argument function thats is responsible for executing each function in a chain.

- `...fns` - an arbitrary number of one-argument functions to be executed in a chain

- `initialArg` - initial argument, passed to the first function in a chain (through a wrapping function)

Arguments of a wrapping function:

- `fn` - function in a chain

- `input` - current value

- `isLast` - boolean flag indicating if a function is a last one in a chain

#### Returns

- Returns a final value.

#### Interface

```
(wrapping_function) => (fn, fn?, ..., fn?) => (initial_value) => result
```

#### Example

```javascript
const { chainRight } = require('@arrows/composition')

// Create custom wrapping function:
const wrappingFn = (fn, input) => {
  console.log(input)
  return fn(input)
}

// Create reusable chain-like function:
const composeWithLog = chainRight(wrappingFn)

// Create concrete function
const calculateRight = composeWithLog((x) => x + 1, (x) => x * 2)

console.log(calculateRight(0))

// -> 0
// -> 0
// -> 1 (final result)
```

---

### compose

Chains provided functions from right to left.

#### Parameters

Arguments listed below have to be passed separately, as segments.

- `...fns` - an arbitrary number of one-argument functions to be executed in a chain

- `initialArg` - initial argument, passed to the first function in a chain

#### Returns

- Returns a final value.

#### Interface

```
(fn, fn?, ..., fn?) => (initial_value) => result
```

#### Example

```javascript
const { compose } = require('@arrows/composition')

const addPrefixes = compose(
  (text) => `prefix1-${text}`,
  (text) => `prefix2-${text}`,
)

addPrefixes('arrows') // -> "prefix1-prefix2-arrows"
```

---

### curry

Wraps function as an automatically curried one.

#### Parameters

- `fn` - an arbitrary function

#### Returns

- Returns a curried version of the function.

#### Interface

```
(fn) =>  curried_fn
```

#### Example

```javascript
const { curry } = require('@arrows/composition')

const rawAdd = (a, b) => a + b

const add = curry(rawAdd)

add(1, 2) // -> 3
add(1)(2) // -> 3
```

---

### pipe

Chains provided functions from left to right.

#### Parameters

Arguments listed below have to be passed separately, as segments.

- `...fns` - an arbitrary number of one-argument functions to be executed in a chain

- `initialArg` - initial argument, passed to the first function in a chain

#### Returns

- Returns a final value.

#### Interface

```
(fn, fn?, ..., fn?) => (initial_value) => result
```

#### Example

```javascript
const { pipe } = require('@arrows/composition')

const addSuffixes = pipe(
  (text) => `${text}-suffix1`,
  (text) => `${text}-suffix2`,
)

addSuffixes('arrows') // -> "arrows-suffix1-suffix2"
```

---

### rail

Works like [pipe](#pipe), but additionally:

- if one of the functions throws or returns an error - returns that error,
- if one of the functions returns undefined - passes previous argument to the next function.

#### Parameters

Arguments listed below have to be passed separately, as segments.

- `...fns` - an arbitrary number of one-argument functions to be executed in a chain

- `initialArg` - initial argument, passed to the first function in a chain

#### Returns

- Returns a final value.

#### Interface

```
(fn, fn?, ..., fn?) => (initial_value) => result
```

#### Examples

Automatically passing down an error:

```javascript
const { rail } = require('@arrows/composition')
const { filter, map, reduce } = require('@arrows/array')

const sumDogsAge = rail(
  filter((pet) => pet.specie === 'dog'),
  map((pet) => {
    if (pet.age < 0) {
      throw new Error('Wrong age!')
    }
    return pet.age
  }),
  reduce((a, b) => a + b, 0),
)

const pets = [
  { specie: 'dog', name: 'Charlie', age: 4 },
  { specie: 'cat', name: 'Luna', age: 6 },
  { specie: 'dog', name: 'Ollie', age: -10 },
]

const result = sumDogsAge(pets)

if (result instanceof Error) {
  console.log('Oops!')
} else {
  console.log(`Sum: ${result}`)
}

// -> "Oops!"
```

Automatically passing previous argument, if function returns `undefined`:

```js
const { rail } = require('../../lib/index')

const addUser = rail(
  (user) => ({ type: 'user', data: user }),
  (entry) => {
    console.log(`Saving ${entry.data.name} to the database.`)
    // Returns undefined, argument will be automatically
    // passed to the next function.
  },
  (entry) => `Saved user: ${entry.data.name}`,
)

const user = { name: 'Joe' }

console.log(addUser(user))

/* Output:
Saving Joe to the database.
Saved user: Joe
*/
```

---

### rail.async

Works similar to [rail](#rail), but additionally, if argument is a promise - resolves that promise before passing to the next function.

#### Parameters

Arguments listed below have to be passed separately, as segments.

- `...fns` - an arbitrary number of one-argument functions to be executed in a chain

- `initialArg` - initial argument, passed to the first function in a chain

#### Returns

- Returns a final value wrapped in a promise.

#### Interface

```
(fn, fn?, ..., fn?) => (initial_value) => result
```

#### Example

Automatically passing down an error:

```javascript
const { railAsync } = require('../../lib/index')

const dbFake = {
  id: 0,
  save() {
    const result = Promise.resolve(this.id)
    this.id++
    return result
  },
}

const addArticle = railAsync(
  (article) => ({ type: 'article', data: article }),
  (entry) => dbFake.save(entry),
  (id) => `Article id: ${id}`,
)

const main = async () => {
  const article = {
    title: 'Railway oriented programming',
    content: 'Lorem ipsum...',
  }

  const result = await addArticle(article)
  console.log(result)
}

main() // -> "Article id: 0"
```

### railRight

Works like [rail](#rail), but executes functions from right to left.

### railRight.async

Works like [railAsync](#railAsync), but executes functions from right to left.

### tap

Executes provided function with provided argument and returns an argument without changes.

Useful for executing void functions without breaking the chain.

_Note: `rail*` functions handle this automatically, so you can use void functions directly._

#### Parameters

- `fn` - an arbitrary function

- `arg` - any value

#### Returns

- Returns argument as-is.

#### Interface

```
(fn, arg) => arg
```

Example:

```js
const { pipe, tap } = require('../../lib/index')
const { sort, reduce, _rest, _butLast } = require('@arrows/array')

const sumNotes = pipe(
  sort((a, b) => a - b),
  tap(console.log),
  _rest,
  tap(console.log),
  _butLast,
  tap(console.log),
  reduce((a, b) => a + b, 0),
)

const notes = [16, 17.5, 19, 15, 18]

console.log(sumNotes(notes))

/* Output:
[ 15, 16, 17.5, 18, 19 ]
[ 16, 17.5, 18, 19 ]
[ 16, 17.5, 18 ]
51.5
*/
```

## License

Project is under open, non-restrictive [ISC license](LICENSE).
