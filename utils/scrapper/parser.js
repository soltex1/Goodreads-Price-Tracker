// Imports
const ErrorHandler = require('../../utils/errorHandler')

// Declare internals
const internals = {}

/**
 * Converts a json into another json with a different format.
 * @param json
 * @returns {Object}
 */
internals.parser = async (json) => {

    const { GoodreadsResponse } = json

    // Check if the json contains the books
    if (!GoodreadsResponse && !GoodreadsResponse.books[0].book) {
      throw new Error('JsonParsingError')
    }

    // Books
    const goodReadsBooks = GoodreadsResponse.books[0]

    // Format the books
    const books = await Promise.all(goodReadsBooks.book.map(async (book) => internals.bookParser(book)))

    // Pagination
    const meta = goodReadsBooks.$
      ? {
        currentPage: parseInt(goodReadsBooks.$.currentpage) || null,
        numPages: parseInt(goodReadsBooks.$.numpages) || null,
        totalItems: parseInt(goodReadsBooks.$.total) || null
      }
      : {}

    return { books, meta }
}

/**
 * Parse a book in json format that comes from scrapper.convert
 * @param book
 * @returns {Object}
 */
internals.bookParser = (book) => {

  const { id, isbn, isbn13, title, image_url, authors, link } = book

  const author = authors[0] && authors[0].author[0] ? authors[0].author[0].name[0] : null
  const numPages = parseFloat(book.num_pages[0]) || null
  const avgRating = parseFloat(book.average_rating[0]) || null

  const bookId = id[0]['_']

  return {
    id: bookId,
    isbn: typeof isbn[0] === 'string' ? isbn[0] : null,
    isbn13: typeof isbn13[0] === 'string' ? isbn13[0] : null,
    title: title[0],
    image_url: image_url[0],
    author,
    numPages,
    avgRating,
    link: link ? link[0] : null,
    prices: {
      bertrand: {
        value: null,
        uri: null
      },
      book_depository: {
        value: null,
        uri: null
      },
      fnac: {
        value: null,
        uri: null
      },
      wook: {
        value: null,
        uri: null
      },
    }
  }
}

module.exports = internals.parser
