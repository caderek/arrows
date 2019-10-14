type CustomErrorClass = { new (details?: any) }

type CreateErrorClass = (
  name: string,
  message: string,
  serializeStacktrace?: boolean,
) => CustomErrorClass

const createErrorClass: CreateErrorClass = (
  name,
  message,
  serializeStacktrace = false,
) => {
  return class extends Error {
    public name: string
    public message: string
    public details: any

    constructor(details: any = null) {
      super(message)
      this.name = name
      this.message = message
      this.details = details
    }

    public toJSON() {
      return JSON.stringify({
        error: {
          name: this.name,
          message: this.message,
          details: this.details,
          ...(serializeStacktrace && { stacktrace: this.stack }),
        },
      })
    }
  }
}

export { createErrorClass }
export default createErrorClass
