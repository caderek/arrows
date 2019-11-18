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
