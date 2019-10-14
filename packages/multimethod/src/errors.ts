import createErrorClass from '@arrows/error/createErrorClass'

export const NoMethodError = createErrorClass(
  'NoMethodError',
  'No method specified for provided arguments.',
)

export const NoArgumentsError = createErrorClass(
  'NoArgumentsError',
  'You have to provide at least one argument.',
)

export const FirstArgumentError = createErrorClass(
  'FirstArgumentError',
  'First argument of multi must be either dispatch function or partially applied method.',
)

export const NotMethodError = createErrorClass(
  'NotMethodError',
  'Argument is not a method',
)

export const NotMultimethodError = createErrorClass(
  'NotMultimethodError',
  'Argument is not a multimethod.',
)
