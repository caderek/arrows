type CustomErrorClass = { new (details?: string) }

type CreateErrorClass = (
  name: string,
  message: string,
  serializeStacktrace?: boolean,
) => CustomErrorClass

/**
 * Creates custom error class that returns extended error object that can be serialized to JSON
 */
const createErrorClass: CreateErrorClass = (
  name,
  message,
  serializeStacktrace = false,
) => {
  return class extends Error {
    public name: string
    public message: string

    constructor(details: string = null) {
      const fullMessage = `${message}${details ? ` ${details}` : ''}`

      super(fullMessage)
      this.name = name
      this.message = fullMessage
    }

    public toJSON() {
      return JSON.stringify({
        error: {
          name: this.name,
          message: this.message,
          ...(serializeStacktrace && { stacktrace: this.stack }),
        },
      })
    }
  }
}

export { createErrorClass }
export default createErrorClass
