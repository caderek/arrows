const { work } = require("@arrows/worker")
const { validate } = require("json-schema")

/**
 * Worker definition only, no export required.
 *
 * @param {Object} payload
 * @param {Object} workerData
 */
const validateWithSchema = (payload, workerData) => {
  return validate(payload, workerData).valid
}

work(validateWithSchema)
