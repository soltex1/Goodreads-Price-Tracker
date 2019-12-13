// Imports
const RequestPromise = require('request-promise')

// Declare internals
const internals = {}

/**
 * Given a uri, make the request and return the response.
 * @param uri
 * @returns {Promise<void>}
 */
internals.request = async (uri) => {

  const options = {
    uri,
    resolveWithFullResponse: false,
    simple: true
  }

  // Make the request and return
  return await RequestPromise(options)
}

module.exports = internals.request
