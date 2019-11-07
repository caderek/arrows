![arrows - string](https://raw.githubusercontent.com/caderek/arrows/master/assets/arrows-string.svg?sanitize=true)

# @arrows/string

![npm (scoped)](https://img.shields.io/npm/v/@arrows/string)
![CircleCI](https://img.shields.io/circleci/build/github/caderek/arrows)
![David (path)](https://img.shields.io/david/caderek/arrows?path=packages%2Fstring)
![Codecov](https://img.shields.io/codecov/c/github/caderek/arrows?token=c6adb715d638431786fefe69ca08ab00)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@arrows/string)
![GitHub](https://img.shields.io/github/license/caderek/arrows)

## Table of contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [API reference](#api-reference)
4. [License](#license)

## Introduction

The purpose of the library is to provide functional wrappers for `String.prototype methods` and provide some additional functions for common tasks.

All wrappers try to mimic original methods as close as possible while providing composable, auto-curried versions of the string methods.

For convenience, some functions have additional methods to execute the most common use cases of the function.

Functions that do not have a native equivalent contain `_` suffix. That way we can implement native-like version in the future (if an equivalent method will be added to the language), without potentially breaking backward-compatibility of the library.

The library has **built-in type definitions**, which provide an excellent IDE support.

## Installation

Via NPM:

```sh
npm i @arrows/string
```

Via Yarn:

```sh
yarn add @arrows/string
```

All modules can be imported independently (to reduce bundle size), here are some import methods (you can use either CommonJS or ES modules):

```js
import arr from '@arrows/string'
```

```js
import { charAt } from '@arrows/string'
```

```js
import charAt from '@arrows/string/charAt'
```

## API reference

### Index

- [charAt](#charat)

### charAt

Functional wrapper for String.prototype.charAt

Retrieves the character at the specified index.

#### Parameters

- `index` Specific index
- `str` Initial string

**Returns:** Character or empty string if out of bound.

## License

Project is under open, non-restrictive [ISC license](LICENSE).
