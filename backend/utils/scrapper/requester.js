// Imports
const RequestPromise = require("request-promise");

/**
 * Given a uri, make the request and return the response.
 * @param uri string
 * @returns {Promise<void>}
 */
const Request = async ( uri ) => {

  const options = {
    uri,
    resolveWithFullResponse: false,
    simple: true
  };

  // Make the request and return
  return await RequestPromise(options);
};

module.exports = Request;
