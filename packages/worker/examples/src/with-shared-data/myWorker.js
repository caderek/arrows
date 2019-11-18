const { worker } = require("@arrows/worker")

const handler = (payload, workerData) => {
  return {
    original: payload,
    calculated: payload + workerData.foo.bar.baz[0],
    shared: workerData,
  }
}

module.exports = worker(handler, {
  poolSize: 1,
  workerData: { foo: { bar: { baz: [7n] } } },
})
