![arrows - worker](https://raw.githubusercontent.com/caderek/arrows/master/assets/arrows-worker.svg?sanitize=true)

# @arrows/worker

![npm (scoped)](https://img.shields.io/npm/v/@arrows/worker)
![CircleCI](https://img.shields.io/circleci/build/github/caderek/arrows)
![David (path)](https://img.shields.io/david/caderek/arrows?path=packages%2Fworker)
![Codecov](https://img.shields.io/codecov/c/github/caderek/arrows?token=c6adb715d638431786fefe69ca08ab00)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@arrows/worker)
![GitHub](https://img.shields.io/github/license/caderek/arrows)

## Table of contents

1. [Introduction](#introduction)
2. [Quick example](#quick-example)
3. [Installation](#installation)
4. [API reference](#api-reference)
5. [License](#license)

## Introduction

Library provides simple, promise-based API on top of the Node.js native [worker_threads module](https://nodejs.org/api/worker_threads.html#). It allows you to use thread pools, and treat thread messages as simple promises, without worrying about about underlying events.

The library has **built-in type definitions**, which provide an excellent IDE support.

## Quick example

Create worker file:

```js
/* myWorker.js */
const { worker } = require("@arrows/worker")

/**
 * Let's create our handler for some CPU-intensive task.
 * Returned value will be passed as a promise to our caller
 * (we don't have to if it's a fire-and-forget task).
 *
 * For example, let's calculate sum of integers from 0 to provided value:
 */
const handler = (payload) => {
  return Array.from({ length: payload }, (_, i) => i).reduce((a, b) => a + b)
}

/**
 * We can now execute the `worker` function
 * that will set up worker threads for us.
 *
 * We can pass custom configuration as a second argument,
 * but in this case we will use the default one (one worker per CPU).
 */
module.exports = worker(handler)
```

We can now use our worker wherever we need it, for example inside simple Express server:

```js
const express = require("express")
const myWorker = require("./myWorker")

express()
  .get("/sum/:end", async (req, res) => {
    const payload = Number(req.params.end)
    const sum = await myWorker(payload)

    res.send({ sum })
  })
  .listen(3000)
```

That's it!

## Installation

Via NPM:

```sh
npm i @arrows/worker
```

Via Yarn:

```sh
yarn add @arrows/worker
```

All modules can be imported independently (to reduce bundle size), here are some import methods (you can use either CommonJS or ES modules):

```js
import worker from "@arrows/worker"
```

```js
import { work } from "@arrows/worker"
```

```js
import work from "@arrows/worker/work"
```

## API reference

### Index

- [worker](#worker)
- [work](#worker)
- [spawn](#worker)

### worker

Spawns workers and returns a function that handles messaging and returns responses as promises.

Combines `spawn` and `work` functions in a single file.

#### Parameters

- `handler` Function that performs calculations inside worker threads.
- `config` Configuration options.

**Returns:** Async function that communicates with worker threads.

#### Example

```js
const { worker } = require("@arrows/worker")

const handler = (payload, workerData) => {
  return /* Do some CPU-intensive task */
}

const config = {
  poolSize: 2,
}

module.exports = worker(handler, config)
```

### work

Defines a worker that can be later used with `spawn` function.

Use when you want to separate worker definition from spawning a thread pool.

#### Parameters

- `handler` Function that performs calculations inside worker threads.

**Returns:** Nothing, just defines a worker for use with `spawn` function.

#### Example

```js
const { work } = require("@arrows/worker")

const handler = (payload, workerData) => {
  return /* Do some CPU-intensive task */
}

work(handler)
```

### spawn

Spawns a workers pool from worker defined in a separate file, returns a function that handles messaging and returns responses as promises.

Use when you want to separate worker definition from spawning a thread pool.

#### Parameters

- `fileName` Path to a worker definition file created with `work` function.
- `config` Configuration options.

**Returns:** Async function that communicates with worker threads.

#### Example

```js
const { spawn } = require("@arrows/worker")

const fileName = "./path/to/myWorkerDefinition"

const config = {
  poolSize: 3,
}

module.export = spawn(fileName, config)
```

## License

Project is under open, non-restrictive [ISC license](LICENSE).