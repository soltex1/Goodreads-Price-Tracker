// Imports
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Declare internals
const internals = {}

/**
 * Parse the response from wook tracker request.
 * @param body
 * @param response
 * @returns {string|number}
 */
internals.wookParser = (body, response) => {

  if (response.statusCode === 200) {

    // Convert the body into DOM elements
    const dom = new JSDOM(body);

    // Get the price from the DOM element
    if (dom.window.document.getElementsByClassName('current').length) {
      const price = dom.window.document.getElementsByClassName('current')[0].innerHTML

      if (price !== null) {
        return parseFloat(price.replace(',', '.'))
      }
    }
  }

  return 'N/A'
}

module.exports = internals.wookParser
