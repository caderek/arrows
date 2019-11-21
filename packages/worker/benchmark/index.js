const autocannon = require("autocannon")
const { spawn } = require("child_process")
const { readdirSync, writeFileSync } = require("fs")

const version = require("../package.json").version.replace(/\./g, "_")

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const serverFiles = readdirSync(`${__dirname}/src`).filter(
  (file) => file !== "myWorker.js",
)

const payload = 10000

const main = async () => {
  const cases = []

  for (const file of serverFiles) {
    const app = spawn("node", [`${__dirname}/src/${file}`])
    await delay(1000)

    const outputs = await Promise.all([
      autocannon({ url: `http://localhost:3000` }),
      autocannon({ url: `http://localhost:3000/${payload}` }),
    ])

    const results = outputs.map((output) => {
      return {
        utl: output.url,
        requests: output.requests.average,
        latency: output.latency.average,
        throughput: output.throughput.average,
        errors: output.errors,
        timeouts: output.timeouts,
      }
    })

    cases.push({ file, results })

    app.kill()
    await delay(1000)
  }

  const summary = cases.map(({ file, results }) => {
    return {
      file,
      totalRequests: Math.round(
        results.reduce((sum, result) => sum + result.requests, 0),
      ),
    }
  })

  console.log(summary)

  const content = JSON.stringify({ summary, cases }, null, 2)

  writeFileSync(`./benchmark/results/v${version}-${Date.now()}.json`, content)
}

main()
