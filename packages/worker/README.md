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
4. [Rationale](#rationale)
5. [Usage](#usage)
   1. [Single-file worker](#single-file-worker)
   2. [Separating worker declaration and spawning](#separating-worker-declaration-and-spawning)
6. [API reference](#api-reference)
7. [License](#license)

## Introduction

The library provides simple, promise-based API on top of the Node.js native [worker_threads module](https://nodejs.org/api/worker_threads.html#). It allows you to use thread pools, and treat thread messages as simple promises, without worrying about underlying events.

Main benefits:

- no boilerplate,
- using worker pools is as simple as calling functions that return promises,
- worker pools are spawned and managed automatically,
- errors inside workers are automatically caught and passed as rejected promises.

The library has **built-in type definitions**, which provide an excellent IDE support.

The library works with:

- Node 10 LTS or higher - with `--experimental-worker` flag,
- Node 12 LTS or higher - out of the box

## Quick example

Create worker file:

```js
/* myWorker.js */
const { worker } = require("@arrows/worker")

/**
 * Let's create our handler for a CPU-intensive task.
 * The returned value will be passed as a promise to our caller
 * (we don't have to if it's a fire-and-forget task).
 *
 * For example, let's calculate the sum of integers from 0 to provided value:
 */
const handler = (payload) => {
  return Array.from({ length: payload }, (_, i) => i).reduce((a, b) => a + b)
}

/**
 * We can now execute the `worker` function
 * that will set up worker threads for us.
 *
 * We can pass custom configuration as a second argument,
 * but in this case, we will use the default one (one worker per CPU).
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
import { spawn } from "@arrows/worker"
```

```js
import spawn from "@arrows/worker/spawn"
```

## Rationale

_Note: If you're not interested in implementation details, you can jump right into the [usage](#usage) section._

Starting from version 12 LTS, Node.js comes with a stable version of the `worker_threads` module. It's a long-anticipated functionality that complements the existing `cluster` module (multi-processes) with native multi-threading solution.

The built-in API is fairly low-level, and while being powerful, it is rather awkward to work with promises. That comes from the fact that worker communication is event-based, so we have multiple events that we want to marry with promises that can only resolve once. If we create a worker per request that fairly straightforward:

```js
/* myWorker.js */
const { Worker, isMainThread, parentPort } = require("worker_threads")

if (isMainThread) {
  module.exports = (payload) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename)
        .once("message", resolve)
        .once("error", reject)

      worker.postMessage(payload)
    })
  }
} else {
  parentPort.once("message", (payload) => {
    // Do some CPU-intensive calculations.
    // For now we will keep it simple:
    const result = payload * 2
    parentPort.postMessage(result)
  })
}
```

```js
const myWorker = require("./myWorker")

const main = async () => {
  const result = await myWorker(7)
  console.log(result) // -> 14
}

main()
```

In addition to being verbose, the code above has a big disadvantage - if we try to call the task many times (which, in case of a server route, can by many thousand times per second) the overhead of creating new worker on each call will slow down the application to the point that it became useless.

So what's the solution? Use raw events instead? We could try, but I cannot think of a clean way to do this when it comes to integrating it with other event-based code (server!).

Fortunately, there is a quite easy solution that takes advantages of two things:

- promises can be resolved from outside if we assign references to `resolve` and `reject` to variables in the outer scope,
- each message can be traced back to a corresponding promise if we add a unique identifier to each message.

We can also do this with many workers in a pool by adding some scheduling strategy. And the best part - we can abstract away all that complexity and present a clean, simple API.

That's the way that this library is implemented, we have:

- thread pools with workers selected by simple round-robin algorithm,
- `resolve` and `reject` references stored in a `Map` with unique message identifiers as keys,
- all the above (and couple other things) completely opaque to the user.

Additionally, the goal of the library is to make simple things truly simple, and complex stuff bearable.

## Usage

### Single-file worker

A single-file worker is created by the `worker` function. As the name suggests, it should be defined in a separate file, with only the code that is necessary for it to do its job. It should be your default choice (over `work` + `spawn` pair), it has a couple of advantages:

- it automatically handles `isMainThread` logic,
- it automatically sets the script path for the worker,
- has best IDE support - has generic type definition with god inference,
  thanks to having all logic in one place.

One disadvantage is that we cannot easily create an ad-hoc instance with different configs (different pool sizes or different shared data) - all is set up at once. In that case, you can use instructions from the next section.

Examples:

```js
const { worker } = require("@arrows/worker")
const { writeFile } = require("fs")

/**
 * Fire-and-forget handler that does not return anything.
 * Could be used for processing and saving/sending non-critical data, etc.
 *
 * @param {number[]} payload - some data series
 */
const handler = (payload) => {
  const stats = {
    average: payload.reduce((a, b) => a + b) / payload.length,
    min: Math.min(...payload),
    max: Math.max(...payload),
    // ...other stats
  }

  const fileName = `${Date.now()}.json`
  const data = JSON.stringify(stats, null, 2)

  writeFile(fileName, data, (error) => {
    if (!error) {
      console.log("Done!")
    }
  })
}

module.exports = worker(handler)
```

```js
const myWorker = require("./myWorker")

const main = async () => {
  myWorker([1, 2, 3, 4, 5, 6, 7, 8, 9])
}

main() // -> "Done!"

/*
Generated file:
{
  "average": 5,
  "min": 1,
  "max": 9
}
*/
```

---

```js
const { worker } = require("@arrows/worker")
const seedrandom = require("seedrandom")

/**
 * A good example of utilizing worker threads
 * - generating pseudo-random data.
 *
 * @param {Object} payload
 * @param {string} payload.seed
 * @param {number} payload.width
 * @param {number} payload.height
 */
const generateWorld = ({ seed, width, height }) => {
  const rng = seedrandom(seed)
  const map = []

  for (let i = 0; i < height; i++) {
    const row = []
    for (let j = 0; j < width; j++) {
      const isWall = rng() > 0.7 ? "💣 " : "🌳 "
      row.push(isWall)
    }
    map.push(row)
  }

  return map
}

module.exports = worker(generateWorld)
```

```js
const myWorker = require("./myWorker")

const main = async () => {
  const world = await myWorker({ seed: "hello", width: 15, height: 10 })

  const render = world.map((row) => row.join("")).join("\n")

  console.log(render)
}

main()

/*
Result:
🌳 🌳 🌳 💣 🌳 💣 💣 🌳 💣 🌳 🌳 🌳 🌳 💣 🌳 
💣 🌳 💣 🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳 💣 🌳 
🌳 🌳 💣 🌳 🌳 💣 💣 🌳 🌳 🌳 💣 🌳 🌳 🌳 💣 
🌳 🌳 🌳 🌳 💣 🌳 🌳 🌳 💣 🌳 💣 🌳 🌳 🌳 💣 
🌳 💣 🌳 🌳 🌳 💣 💣 🌳 🌳 🌳 💣 💣 🌳 🌳 🌳 
💣 💣 🌳 🌳 🌳 🌳 💣 🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳 
🌳 🌳 💣 🌳 🌳 🌳 💣 🌳 🌳 🌳 🌳 🌳 🌳 🌳 🌳 
🌳 🌳 🌳 💣 🌳 🌳 🌳 🌳 💣 💣 🌳 🌳 💣 🌳 🌳 
🌳 💣 💣 🌳 💣 💣 💣 💣 💣 🌳 🌳 💣 🌳 🌳 🌳 
💣 🌳 🌳 💣 🌳 🌳 🌳 💣 🌳 🌳 💣 💣 🌳 🌳 🌳  
*/
```

---

```js
const { worker } = require("@arrows/worker")

/**
 * Another example - complex mathematical operations.
 *
 * @param {number} iterations
 * @returns {number} PI approximation
 */
const calculatePI = (iterations) => {
  let pi = 0
  for (let i = 0; i < iterations; i++) {
    let temp = 4 / (i * 2 + 1)
    pi += i % 2 === 0 ? temp : -temp
  }
  return pi
}

/**
 * Note that in some cases you may want to decrease
 * the number of workers in the pool.
 * For example, if a system runs many application, full CPU load
 * can be less performant (cost of switching between applications).
 */
module.exports = worker(calculatePI, { poolSize: 2 })
```

```js
const myWorker = require("./myWorker")

const main = async () => {
  const result = await myWorker(1000000)
  console.log(result) // -> 3.1415916535897743
}

main()
```

### Separating worker declaration and spawning

In some cases, you may want to prepare separate worker definition (via `work` function) to spawn it multiple times with different shared data and pool size (via `spawn` function).

It allows you to optimize execution time (shared data is serialized and deserialized once per each pool).

Example:

```js
/* myWorkerDefinition.js */
const { work } = require("@arrows/worker")
const { validate } = require("json-schema")

/**
 * Worker definition only, no export required.
 *
 * @param {Object} payload
 * @param {Object} workerData
 */
const validateWithSchema = (payload, workerData) => {
  return validate(payload, workerData).valid
}

work(validateWithSchema)
```

```js
/* myWorkers.js */
const { spawn } = require("@arrows/worker")

const userSchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
  },
}

const postSchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    content: {
      type: "string",
    },
  },
}

/**
 * Spawn separate worker pools for validating users and posts,
 * witch their own schemas as shared `workerData`.
 */

exports.validateUser = spawn("./myWorkerDefinition.js", {
  workerData: userSchema,
  poolSize: 4,
})

exports.validatePost = spawn("./myWorkerDefinition.js", {
  workerData: postSchema,
  poolSize: 3,
})
```

```js
const { validateUser, validatePost } = require("./myWorkers")

const main = async () => {
  const userValidationResult = await validateUser({
    firstName: "John",
    lastName: "Doe",
  })

  const postValidationResult = await validatePost({
    title: "Worker Threads",
    content: Date.now(),
  })

  console.log({ userValidationResult, postValidationResult })
  // -> { userValidationResult: true, postValidationResult: false }
}

main()
```

---

\_Note: You can find an run all the examples listed above inside the [/examples](/examples) folder.

## API reference

### Index

Functions:

- [worker](#worker)
- [work](#worker)
- [spawn](#worker)
- [task](#task)

Arguments:

- [handler](#handler)
- [config](#config)

---

### `worker`

Spawns workers and returns a function that handles messaging and returns responses as promises.

Combines `spawn` and `work` functions in a single file.

#### Parameters

- `handler` - Function that performs calculations inside worker threads ([see more](#handler)).
- `config` - Configuration options ([see more](#config)).

**Returns:** Async function that communicates with worker threads ([see more](#task)).

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

---

### `work`

Defines a worker that can be later used with `spawn` function.

Use when you want to separate worker definition from spawning a thread pool.

#### Parameters

- `handler` - Function that performs calculations inside worker threads ([see more](#handler)).

**Returns:** Nothing, just defines a worker for use with `spawn` function.

#### Example

```js
const { work } = require("@arrows/worker")

const handler = (payload, workerData) => {
  return /* Do some CPU-intensive task */
}

work(handler)
```

---

### `spawn`

Spawns a workers pool from worker defined in a separate file, returns a function that handles messaging and returns responses as promises.

Use when you want to separate worker definition from spawning a thread pool.

#### Parameters

- `fileName` - Path to a worker definition file created with `work` function.
- `config` - Configuration options ([see more](#config)).

**Returns:** Async function that communicates with worker threads ([see more](#task)).

#### Example

```js
const { spawn } = require("@arrows/worker")

const fileName = "./path/to/myWorkerDefinition"

const config = {
  poolSize: 3,
}

module.export = spawn(fileName, config)
```

---

### `task`

A task is a function returned by calling `worker` or `spawn` function,
it passes a payload to the workers' pool and returns a promise with the result.

#### Parameters

- `payload` - Payload that will be passed to automatically selected worker from a pool.

**Returns:** The result of running a worker handler on the provided payload (as a promise).

---

### `handler`

A handler is a user-defined function passed to `worker` or `spawn` function.

Errors thrown inside handlers will be automatically caught and converted to rejected promises.

The handler can be an `async` function, can return a promise.

#### Parameters

- `payload` - Data received by worker.
- `workerData` - Data shared between workers, set via config object.

**Returns:** Any value calculated by user (or void).

---

### `config`

Config is an optional object passed to `worker` or `spawn` function,
that modifies default settings of the workers' pool.

#### Available options

- `poolSize` - size of the worker thread pool, must be greater than 0 (default: number of CPUs)

- `workerData` - Data shared between workers, will be passed as a second argument of the handler.

Additionally, you can pass any of the standard worker options, see: [worker threads docs](https://nodejs.org/api/worker_threads.html#worker_threads_new_worker_filename_options).

## License

Project is under open, non-restrictive [ISC license](LICENSE).
