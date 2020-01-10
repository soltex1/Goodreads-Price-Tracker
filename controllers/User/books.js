// imports
const Joi = require('@hapi/joi')
const ErrorHandler = require('../../utils/errorHandler')

// declare internals
const internals = {}

internals.scrapper = {
  request: require('../../utils/scrapper/request'),
  convert: require('../../utils/scrapper/convert'),
  parse: require('../../utils/scrapper/parser')
}

// Get the good reads request uri
internals.getGoodReadsUri = (userId, page, API_KEY) => {
  return `https://www.goodreads.com/review/list/${userId}.xml?key=${API_KEY}&page=${page}&shelf=to-read`
}

/**
 * Get user's goodreads 'to-read'.
 * @param request
 * @param h
 * @returns {Promise<void>}
 */
internals.getBooks = async (request, h) => {

  try {

    const { page, userId } = request.query

    const goodReadsUri = internals.getGoodReadsUri(userId, page, process.env.GOODREADS_API_KEY)

    // Make the Request
    const response = await internals.scrapper.request(goodReadsUri)

    // Convert the xml request response into json
    const responseJSON = await internals.scrapper.convert(response)

    // Parse the json and return
    const responseParsed = await internals.scrapper.parse(responseJSON)

    // Return the parsed json
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
      response: {
        schema: Joi.object({
          books: Joi.array().items(
            Joi.object({
              id: Joi.string().required(),
              title: Joi.string().required(),
              isbn: Joi.string().required().allow(null),
              isbn13: Joi.string().required().allow(null),
              author: Joi.string().required().allow(null),
              numPages: Joi.number().allow(null),
              avgRating: Joi.number().required().allow(null),
              image_url: Joi.string().required(),
              link: Joi.string().required().allow(null),
              prices: {
                bertrand: Joi.object({
                  value: Joi.string().allow(null),
                  uri: Joi.string().allow(null)
                }),
                book_depository: Joi.object({
                  value: Joi.string().allow(null),
                  uri: Joi.string().allow(null)
                }),
                fnac: Joi.object({
                  value: Joi.string().allow(null),
                  uri: Joi.string().allow(null)
                }),
                wook: Joi.object({
                  value: Joi.string().allow(null),
                  uri: Joi.string().allow(null)
                }),
              }
            })
          ),
          meta: Joi.object({
            totalItems: Joi.number().required().allow(null),
            numPages: Joi.number().required().allow(null),
            currentPage: Joi.number().required().allow(null),
          })
        })
      }
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
