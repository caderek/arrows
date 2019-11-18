const myWorker = require("./myWorker")

const main = async () => {
  const result = await myWorker(7)
  console.log(result) // -> 14
}

main()
