const Book = require('./Book')
const User = require('./User')

exports.plugin = {
  name: 'controllers',
  version: '1.0.0',
  register: async (server, options) => {
    try {
      // child controllers
      await server.register([
        Book,
        User
      ], options)

      server.log('controllers', 'loaded')

    } catch (e) {
      server.log(['error', 'controllers'], e.message)
      throw e
    }
  }
}
