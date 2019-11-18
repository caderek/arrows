const myWorker = require("./myWorker")

const main = async () => {
  console.time("Time")
  const result = await Promise.all(
    Array.from({ length: 10 }, (_, i) => myWorker(i)),
  )
  console.timeEnd("Time")
  console.log({ result })
}

main()
