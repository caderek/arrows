const { work } = require("../../../lib")

module.exports = work((payload) => {
  return payload * 2
})
