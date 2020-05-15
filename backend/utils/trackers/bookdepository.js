// Imports
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Declare internals
const internals = {};

/**
 * Parse the response from book depository tracker request.
 * @param body
 * @param response
 * @returns {string|number}
 */
internals.bookDepositoryParser = (body, response) => {

  const prices = [];

  if (response.statusCode === 200) {

    // Convert the body into DOM elements
    const dom = new JSDOM(body);

    ["sale-price", "list-price"].forEach((className) => {

      // Get the price from the DOM element
      if (dom.window.document.getElementsByClassName(className).length) {
        const price = dom.window.document.getElementsByClassName(className)[0].innerHTML;

        // Match number
        const regex = /[+-]?\d+(\.\d+)?/g;

        if (price.match(regex) !== null) {

          let currentPrice = parseFloat(price.match(regex).join("."));

          if (!isNaN(currentPrice)) prices.push(currentPrice);
        }
      }
    });
  }

  return prices.length ? Math.min.apply(null, prices) : "N/A";
};

module.exports = internals.bookDepositoryParser;
