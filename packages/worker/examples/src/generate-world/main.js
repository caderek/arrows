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
