// imports
const Joi = require('@hapi/joi')
const { trackers } = require('../../constants/trackers')
const ErrorHandler = require('../../utils/errorHandler')

// declare internals
const internals = {}

internals.scrapper = {
  request: require('../../utils/scrapper/request'),
  convert: require('../../utils/scrapper/convert'),
  parse: require('../../utils/scrapper/parser')
}

internals.getGoodReadsUri = (userId, page, API_KEY) => `https://www.goodreads.com/review/list/${userId}.xml?key=${API_KEY}&page=${page}`

// get goodreads books given a user identifier
internals.getBooks = async (request, h) => {
  try {
    const { page, userId } = request.query

    const goodReadsUri = internals.getGoodReadsUri(userId, page, process.env.GOODREADS_API_KEY)

    // Request
    const response = await internals.scrapper.request(goodReadsUri)

    // Convert the request response xml into json
    const responseJSON = await internals.scrapper.convert(response)

    // Parse the json
    const responseParsed = await internals.scrapper.parse(responseJSON)

    // Send events for each book
    request.server.inject({
      method: 'POST',
      url: '/books/events',
      allowInternals: true,
      payload: {
        books: responseParsed.books.map((book) => { return { id: book.id, isbn: book.isbn }})
      }
    })

    return responseParsed

  } catch (e) {
    return ErrorHandler(e)
  }
}

internals.routes = [
  {
    method: 'GET',
    path: '/user/books',
    handler: internals.getBooks,
    options: {
      validate: {
        query: Joi.object({
          page: Joi.number().min(1).default(1),
          userId: Joi.string().required()
        }),
      },
      /*
      response: {
        schema: Joi.object({
          books: Joi.array().items(
            Joi.object({
              id: Joi.string().required(),
              title: Joi.string().required(),
              isbn: Joi.string().required().allow(null),
              isbn13: Joi.string().required().allow(null),
              image_url: Joi.string().required(),
              prices: {
                wook: Joi.string().allow(null),
                book_depository: Joi.string().allow(null)
              }
            })
          ),
          meta: Joi.object({
            start: Joi.string().required(),
            end: Joi.string().required(),
            total: Joi.string().required(),
            numpages: Joi.string().required(),
            currentpage: Joi.string().required()
          })
        })
      }*/
    }
  }
]

exports.plugin = {
  name: 'user',
  version: '1.0.0',
  register: async (server, _) => {

    // Routes
    server.route(internals.routes)
  }
}
