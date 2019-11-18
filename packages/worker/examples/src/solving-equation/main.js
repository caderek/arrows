const myWorker = require("./myWorker")

const main = async () => {
  const result = await myWorker(1000000)
  console.log(result) // -> 3.1415916535897743
}

main()
