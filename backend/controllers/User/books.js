// Imports
const Joi = require("@hapi/joi");

const ErrorHandler = require("../../utils/errorHandler");
const Scrapper = require("../../utils/scrapper");

// Declare internals
const internals = {};

// Get the good reads request uri
internals.getGoodReadsUri = (userId, page, API_KEY) => {
  return `https://www.goodreads.com/review/list/${userId}.xml?key=${API_KEY}&page=${page}&shelf=to-read`;
};

/**
 * Get user's goodread books set as 'to-read'.
 * @param request
 * @param h
 * @returns {Promise<void>}
 */
internals.getBooks = async (request) => {

  try {

    const { page, userId } = request.query;

    const goodReadsUri = internals.getGoodReadsUri(userId, page, process.env.GOODREADS_API_KEY);

    const scrapper = new Scrapper();

    // Make the Request
    const responseXML = await scrapper.request(goodReadsUri);

    // Convert the xml request response into json
    const responseJSON = await scrapper.convert(responseXML);

    // Parse the json and return
    return await scrapper.parse(responseJSON);

  } catch (e) {
    return ErrorHandler(e);
  }
};

internals.routes = [
  {
    method: "GET",
    path: "/user/books",
    handler: internals.getBooks,
    options: {
      validate: {
        query: Joi.object({
          page: Joi.number().min(1).default(1),
          userId: Joi.string().required()
        })
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
              imageUrl: Joi.string().required(),
              link: Joi.string().required().allow(null),
              prices: {
                bertrand: Joi.object({
                  value: Joi.string().allow(null),
                  uri: Joi.string().allow(null)
                }),
                bookDepository: Joi.object({
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
                })
              }
            })
          ),
          meta: Joi.object({
            totalItems: Joi.number().required().allow(null),
            numPages: Joi.number().required().allow(null),
            currentPage: Joi.number().required().allow(null)
          })
        })
      }
    }
  }
];

exports.plugin = {
  name: "user",
  version: "1.0.0",
  register: async (server) => {

    // Routes
    server.route(internals.routes);
  }
};
