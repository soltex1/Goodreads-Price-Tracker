// Imports
const RequestPromise = require("request-promise");

// Declare internals
const internals = {};

/**
 * Given a book isbn try to get the price from the specified tracker, eg: wook.
 * @param tracker string
 * @param bookId string
 * @param bookIsbn string
 * @returns {Promise<T | string>}
 */
internals.getPrice = (tracker, bookId, bookIsbn) => {

  const requestOptions = {
    uri: tracker.uri(bookIsbn),
    transform: tracker.transform
  };

  // Make the request, parse it and return the price or 'N/A' if it fails
  return requestTimeout(30000, RequestPromise(requestOptions))
    .then((price) => price)
    .catch((e) => "N/A");
};

function requestTimeout (msecs, promise) {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("timeout"));
    }, msecs);
  });
  return Promise.race([timeout, promise]);
}

module.exports = {
  getPrice: internals.getPrice
};
