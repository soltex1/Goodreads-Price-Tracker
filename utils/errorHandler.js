// Imports
const Boom = require('@hapi/boom')
const {
  SERVER_ERROR,
  STATUS_CODE_ERROR,
  TRANSFORM_ERROR
} = require('../constants/requestErrors')

// Declare internals
const internals = {}

internals.errorHandler = (error) => {

  const errorName = error.message || error.name

  switch (errorName) {
    case TRANSFORM_ERROR:
      // The request failed due transform errors
      return Boom.badRequest(TRANSFORM_ERROR)

    case STATUS_CODE_ERROR:
      // The request failed due status code error
      return Boom.notFound(STATUS_CODE_ERROR)

    default:
      // The request failed due to technical reasons.
      return Boom.badRequest(SERVER_ERROR)
  }
}

module.exports = internals.errorHandler
