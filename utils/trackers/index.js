// Imports
const RequestPromise = require('request-promise')

// Declare internals
const internals = {}

/**
 * Given a book isbn try to get the price from the specified tracker, eg: wook.
 * @param tracker
 * @param bookId
 * @param bookIsbn
 * @returns {Promise<T | string>}
 */
internals.getPrice = (tracker, bookId, bookIsbn) => {

  const requestOptions = {
    uri: tracker.uri(bookIsbn),
    transform: tracker.transform
  }

  // Make the request, parse it and return the price or 'N/A' if it fails
  return RequestPromise(requestOptions)
    .then((price) => price)
    .catch((e) =>  'N/A')
}

module.exports = {
  getPrice: internals.getPrice
}
