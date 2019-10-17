# @arrows/dispatch

![npm (scoped)](https://img.shields.io/npm/v/@arrows/dispatch)
![CircleCI](https://img.shields.io/circleci/build/github/caderek/arrows)
![David (path)](https://img.shields.io/david/caderek/arrows?path=packages%2Fdispatch)
![Codecov](https://img.shields.io/codecov/c/github/caderek/arrows?token=c6adb715d638431786fefe69ca08ab00)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@arrows/dispatch)
![GitHub](https://img.shields.io/github/license/caderek/arrows)

## Table of contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [API reference](#api-reference)
   - [getType](#getType)
   - [identity](#identity)
   - [is](#is)
   - [isIn](#isIn)
   - [types](#types)
4. [License](#license)

## Introduction

The library contains a collection of dispatch functions.
All functions with the arity (number of arguments) greater than one are automatically curried, so a partial application is possible.

The library has **built-in type definitions**, which provide an excellent IDE support.

## Installation

Via NPM:

```sh
npm i @arrows/dispatch
```

Via Yarn:

```sh
yarn add @arrows/dispatch
```

All modules can be imported independently (to reduce bundle size), here are some import methods (you can use either CommonJS or ES modules):

```js
import dispatch from '@arrows/dispatch'
```

```js
import { getType } from '@arrows/dispatch'
```

```js
import getType from '@arrows/dispatch/getType'
```

## API reference

### getType

Retrieves the type of a value (using internal `[[Class]]` property).
More useful alternative for `typeof` operator.

It does not return custom prototypes - if you need that, use the `is` function instead.

_See: [types](#types) for the list of the most common values._

_See: [MDN - Object.prototype.toString.call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#Using_toString_to_detect_object_class)_

#### Parameters

- `value` - Any value

#### Returns

- Returns an underlying class as a string.

#### Interface

```
(value) => underlying_class_name
```

#### Example

```javascript
getType(1) // -> "Number"
getType(/abc/) // -> "RexExp"
getType([1, 2, 3]) // -> "Array"
```

### identity

Standard identity function - useful as a default dispatch or a placeholder.

#### Parameters

- `value` - Any value

#### Returns

- Returns the argument as-is.

#### Interface

```
(value) => value
```

#### Example

```javascript
identity('foo') // -> "foo"
identity([1, 2, 3]) // -> [1, 2, 3]
```

### is

Checks if a value is an instance of a prototype/class.

#### Parameters

- `prototype` - A prototype/class with which you want to check the value.
- `value` - Any value

#### Returns

- Returns true is a value is an instance of a prototype/class, false otherwise.

#### Interface

```
(prototype, value) => boolean
```

#### Example

```javascript
class Cat {}
class Dog {}

const cat = new Cat()
const dog = new Dog()

is(Cat, cat) // -> true
is(Dog, cat) // -> false

is(Cat)(cat) // -> true
is(Dog)(cat) // -> false
```

### isIn

Checks if a value is inside an array/set.

#### Parameters

- `list` - An array or a set of values
- `value` - Any value

#### Returns

- Returns true is a value is inside an array/set, false otherwise.

#### Interface

```
(array_or_set, value) => boolean
```

#### Examples

```javascript
const names = ['Alice', 'Joe', 'John']

isIn(names, 'Alice') // -> true
isIn(names, 'Bob') // -> false

isIn(names)('Alice') // -> true
isIn(names)('Bob') // -> false
```

```javascript
const names = new Set(['Alice', 'Joe', 'John'])

isIn(names, 'Alice') // -> true
isIn(names, 'Bob') // -> false

isIn(names)('Alice') // -> true
isIn(names)('Bob') // -> false
```

### types

An object that contains a list of the most common types to use with the [getType](#getType) function. You can use instead using raw strings, which is error-prone.

#### Example

```javascript
getType([1, 2, 3]) === types.Array // -> true

getType(() => null) === types.Function // -> true

getType(Promise.resolve()) === types.Promise // -> true

getType('1') === types.Number // -> false
```

## License

Project is under open, non-restrictive [ISC license](LICENSE).
