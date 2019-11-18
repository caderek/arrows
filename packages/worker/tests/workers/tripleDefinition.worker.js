const { work } = require("../../lib")

work((payload) => {
  if (typeof payload !== "number") {
    throw new Error("Number required.")
  }
  return payload * 3
})
