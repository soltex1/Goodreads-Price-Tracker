// Imports
const { getPrice } = require('../../utils/trackers')
const { trackers } = require('../../constants/trackers')
const ErrorHandler = require('../../utils/errorHandler')

// Declare internals
const internals = {}

/**
 * Given a list of books, get the price from the trackers,
 * and send an event to the client.
 * @param request
 * @param h
 * @returns {*}
 */
internals.sendEvents = (request, h) => {

  // Socket io plugin
  const io = request.server.plugins['hapi-socket.io'].io

  request.payload.books.map((book) => {

    const bookId = book.id
    const bookIsbn = book.isbn
    const bookIsbn13 = book.isbn13

    // For each tracker, get the price and emit an event
    trackers.forEach(async (tracker) => {
      try {

        let bookPrice = 'N/A'
        const trackerName = tracker.name

        if (bookIsbn !== null) {
          bookPrice = await getPrice(tracker, bookId, bookIsbn)
        }

        if (bookPrice === 'N/A' && bookIsbn13 !== null) {
          bookPrice = await getPrice(tracker, bookId, bookIsbn13)

        }

        // Send the event to the client
        io.sockets.emit('book', { bookId, bookPrice, trackerName })

      } catch (e) {
        console.log('event emit failed: ', e.message)
      }
    })
  })

  return h.response()
}

internals.routes = [
  {
    method: 'POST',
    path: '/books/events',
    handler: internals.sendEvents,
    options: {
      isInternal: true,
    }
  }
]

exports.plugin = {
  name: 'books',
  version: '1.0.0',
  register: async (server, options) => {

    // Routes
    server.route(internals.routes)
  }
}
