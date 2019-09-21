const create = ({ name, defaultMessage = '' }) => {
  const err = class extends Error {
    constructor(message = defaultMessage) {
      super(message)
      this.name = name
      this.message = message
    }
  }

  return err
}

const toJSON = (error) => {
  return JSON.stringify({
    error: {
      name: error.name,
      message: error.message,
      stacktrace: error.stack,
    },
  })
}

export default {
  create,
  toJSON,
}
