// Imports
const { getPrice } = require('../../utils/trackers')
const { trackers } = require('../../constants/trackers')

// Declare internals
const internals = {}

// Given a list of books, get the price from the trackers, and send an event
internals.sendEvents = (request, h) => {

  // Socket io plugin
  const io = request.server.plugins['hapi-socket.io'].io

  request.payload.books.map((book) => {

    const bookId = book.id
    const bookIsbn = book.isbn

    // For each tracker, get the price and emit an event
    trackers.forEach(async (tracker) => {

      const bookPrice = await getPrice(tracker, bookId, bookIsbn)
      const trackerName = tracker.name
      const eventData = { bookId, bookPrice, trackerName }

      io.sockets.emit('welcome', eventData)
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
