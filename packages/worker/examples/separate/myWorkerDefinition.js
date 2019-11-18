const { work } = require("../../lib/index")

work((payload) => {
  return payload * 2
})
