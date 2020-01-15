// Imports
const jsdom = require('jsdom')
const { JSDOM } = jsdom

// Declare internals
const internals = {}

/**
 * Parse the response from wook tracker request.
 * @param body
 * @param response
 * @returns {string|number}
 */
internals.fnacParser = (body, response) => {

  const prices = []

  if (response.statusCode === 200) {

    // Convert the body into DOM elements
    const dom = new JSDOM(body)

    let minPrice = Number.MAX_SAFE_INTEGER;

    ['userPrice', 'price red'].forEach((className) => {

      // Get the price from the DOM element
      if (dom.window.document.getElementsByClassName(className).length) {
        const price = dom.window.document.getElementsByClassName(className)[0].innerHTML

        if (price !== null) {
          let currentPrice = parseFloat(price.replace(',', '.'))

          if (!isNaN(currentPrice)) prices.push(currentPrice)
        }
      }
    })
  }

  return prices.length ? Math.min.apply(null, prices) : 'N/A'
}

module.exports = internals.fnacParser
