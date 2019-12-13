const Books = require('./books')

const internals = {}

internals.getUser = (request, h) => {
  return 'User';
}

internals.routes = [
  {
    method: 'GET',
    path: '/user',
    handler: internals.getUser
  }
]

exports.plugin = {
  name: 'user-books',
  version: '1.0.0',
  register: async (server, options) => {

    // child controllers
    await server.register([
      Books
    ], options)

    // Routes
    server.route(internals.routes)
  }
}
