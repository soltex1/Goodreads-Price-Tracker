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
internals.bertrandParser = (body, response) => {

  if (response.statusCode === 200) {

    // Convert the body into DOM elements
    const dom = new JSDOM(body);

    const count = parseInt(dom.window.document.getElementsByClassName('search-results-label')[0].querySelector('h1').innerHTML.split(' ')[0]) || 0

    if (count > 0) {
      // Get the price from the DOM element
      if (dom.window.document.getElementsByClassName('active-price').length) {
        const price = dom.window.document.getElementsByClassName('active-price')[0].innerHTML

        if (price !== null) {
          return parseFloat(price.replace(',', '.'))
        }
      }
    }
  }

  return 'N/A'
}

module.exports = internals.bertrandParser
