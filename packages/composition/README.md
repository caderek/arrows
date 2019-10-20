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
   - [railAsync](#railAsync)
   - [railRight](#railRight)
   - [railRightAsync](#railRightAsync)
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

Executes provided functions from left to right, passing the result from one function to the other. Accepts a wrapping function which can execute additional instructions before executing each passed function.

Allows you to build your own, chain-like functions.

#### Parameters

Arguments listed below have to be passed separately, as segments.

- `wrappingFn` - one-argument function thats is responsible for executing each function in a chain.

- `...fns` - an arbitrary number of functions to be executed in a chain

- `initialArg` - initial argument, passed to the first function in a chain (through a wrapping function)

#### Returns

- Returns a final value.

#### Interface

```
(wrapping_function) => (fn, fn?, ..., fn?) => (initial_value) => result
```

#### Examples

```javascript
```

---

### chainRight

Works like [chain](#chain), but executes functions from right to left.

#### Parameters

- `` -

#### Returns

- Returns

#### Interface

```
() =>
```

#### Example

```javascript
```

---

## License

Project is under open, non-restrictive [ISC license](LICENSE).
