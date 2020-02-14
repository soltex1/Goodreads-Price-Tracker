// Imports
const Joi = require('@hapi/joi')

const { getPrice } = require('../../utils/trackers')
const { trackers } = require('../../constants/trackers')

// Declare internals
const internals = {}

/**
 * Get the prices of a book from all registered stores.
 * @param request
 * @param h
 * @returns {*}
 */
internals.getPrices = async (request, h) => {

  let { isbn } = request.query

  isbn = isbn.replace(/\s+/g, '')

  const response = []

  // For each tracker, get the price and emit an event
  await Promise.all([...trackers].map(async ([name, tracker]) => {
    try {

      let price = null
      let uri = null

      if (isbn !== null) {
        price = await getPrice(tracker, '', isbn)
        uri = tracker.uri(isbn)
      }
console.log('>>', name, price)
      response.push({ price, tracker: name, uri })

    } catch (e) {
      console.log(e.message)
    }
  }))

  return h.response(response)
}

internals.routes = [
  {
    method: 'GET',
    path: '/shops/prices',
    handler: internals.getPrices,
    options: {
      validate: {
        query: Joi.object({
          isbn: Joi.string().required()
        }),
      },
      response: {
        schema: Joi.array().items(
          Joi.object({
            price: Joi.alternatives().try(
              Joi.number(),
              Joi.string().valid('N/A')
            ),
            tracker: Joi.string(),
            uri: Joi.string()
          })
        )
      }
    }
  }
]

exports.plugin = {
  name: 'shop',
  version: '1.0.0',
  register: async (server, options) => {

    // Routes
    server.route(internals.routes)
  }
}
