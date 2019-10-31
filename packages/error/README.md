![arrows - error](https://raw.githubusercontent.com/caderek/arrows/master/assets/arrows-error.svg?sanitize=true)

# @arrows/error

![npm (scoped)](https://img.shields.io/npm/v/@arrows/error)
![CircleCI](https://img.shields.io/circleci/build/github/caderek/arrows)
![David (path)](https://img.shields.io/david/caderek/arrows?path=packages%2Ferror)
![Codecov](https://img.shields.io/codecov/c/github/caderek/arrows?token=c6adb715d638431786fefe69ca08ab00)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@arrows/error)
![GitHub](https://img.shields.io/github/license/caderek/arrows)

## Table of contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [API reference](#api-reference)
   - [createErrorClass](#createErrorClass)
4. [License](#license)

## Introduction

The library contains a set of helper functions for error handling.

The library has **built-in type definitions**, which provide an excellent IDE support.

## Installation

Via NPM:

```sh
npm i @arrows/error
```

Via Yarn:

```sh
yarn add @arrows/error
```

## API reference

### createErrorClass

Creates custom error class that returns extended error object that can be serialized to JSON.

#### Parameters

- `name` - The error name (should be the same as the name of the variable to which the class is assigned)
- `message` - Error message
- `serializeStacktrace` An optional boolean flag, to indicate weather a stacktrace should be serialized (default: false)

#### Returns

- Returns custom error class that takes one optional argument - error details

#### Interface

```
(name , message, serializeStacktrace?) => custom_error_class
```

#### Examples

Create a custom error class:

```javascript
const MyError = createErrorClass('MyError', 'some message')
```

Create a custom error class with serializable stacktrace:

```javascript
const MyError = createErrorClass('MyError', 'some message', true)
```

## License

Project is under open, non-restrictive [ISC license](LICENSE).
