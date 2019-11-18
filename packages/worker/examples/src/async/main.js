const myWorker = require("./myWorker")

const main = async () => {
  try {
    const result = await Promise.all(
      Array.from({ length: 20 }, (_, i) => myWorker(i)),
    )

    console.log({ result })
  } catch (error) {
    console.log("Oops!")
  }
}

main()
