const { spawn } = require("@arrows/worker")

const userSchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
  },
}

const postSchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    content: {
      type: "string",
    },
  },
}

/**
 * Spawn separate worker pools for validating users and posts,
 * witch their own schemas as shared `workerData`.
 */

exports.validateUser = spawn("./myWorkerDefinition.js", {
  workerData: userSchema,
  poolSize: 4,
})

exports.validatePost = spawn("./myWorkerDefinition.js", {
  workerData: postSchema,
  poolSize: 3,
})
