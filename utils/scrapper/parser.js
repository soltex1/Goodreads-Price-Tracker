// Imports
const ErrorHandler = require('../../utils/errorHandler')

// Declare internals
const internals = {}

/**
 * Converts a given json into another json with a different format.
 * @param json
 * @returns {Object}
 */
internals.parser = async (json) => {

  try {
    const { GoodreadsResponse } = json

    // Check if the json contains the books
    if (!GoodreadsResponse && !GoodreadsResponse.books[0].book) {
      return new Error()
    }

    // Books
    const goodReadsBooks = GoodreadsResponse.books[0]

    // Format the books
    const books = await Promise.all(goodReadsBooks.book.map(async (book) => internals.bookParser(book)))

    // Pagination
    const meta = goodReadsBooks.$
      ? {
        currentPage: parseInt(goodReadsBooks.$.currentpage),
        numPages: parseInt(goodReadsBooks.$.numpages),
        totalItems: parseInt(goodReadsBooks.$.total)
      }
      : {}

    return { books, meta }

  } catch (e) {
    // Handle the errors
    return ErrorHandler(e)
  }
}

/**
 * Parse a book in json format that comes from scrapper.convert
 * @param book
 * @returns {Object}
 */

// parse a book in json format from good reads
internals.bookParser = async (book) => {
  const { id, isbn, isbn13, title, image_url, authors } = book

  const author = authors[0] && authors[0].author[0] ? authors[0].author[0].name[0] : null
  const numPages = book.num_pages ? parseFloat(book.num_pages[0]) : null
  const avgRating = book.average_rating ? parseFloat(book.average_rating[0]) : null

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
    prices: {
      WOOK: null,
      BOOK_DEPOSITORY: null
    }
  }
}

module.exports = internals.parser
