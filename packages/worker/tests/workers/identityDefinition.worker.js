const { work } = require("../../lib")

exports.identityHandler = (payload) => payload
exports.identityDefinition = work(this.identityHandler)
