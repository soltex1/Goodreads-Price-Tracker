// Declare internals
const internals = {}

// Get the user information
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
  name: 'user',
  version: '1.0.0',
  register: async (server, options) => {

    // Routes
    server.route(internals.routes)
  }
}
