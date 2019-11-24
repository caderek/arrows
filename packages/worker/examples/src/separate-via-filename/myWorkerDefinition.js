const { work } = require("@arrows/worker")

work((payload) => {
  return payload * 2
})
