const myWorker = require("./myWorker")

const main = async () => {
  const result = await Promise.all(
    Array.from({ length: 10 }, (_, i) => myWorker(i)),
  )

  console.log({ result })
}

main()
