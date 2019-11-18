const { validateUser, validatePost } = require("./myWorkers")

const main = async () => {
  const userValidationResult = await validateUser({
    firstName: "John",
    lastName: "Doe",
  })

  const postValidationResult = await validatePost({
    title: "Worker Threads",
    content: Date.now(),
  })

  console.log({ userValidationResult, postValidationResult })
  // -> { userValidationResult: true, postValidationResult: false }
}

main()
