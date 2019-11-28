const myWorker = require("./myWorker")

const main = async () => {
  try {
    console.time("Time")
    const result = await Promise.all(
      Array.from({ length: 20 }, (_, i) => myWorker(i)),
    )
    console.timeEnd("Time")

    console.log({ result })
  } catch (error) {
    console.log("Oops!")
  }
}

main()
