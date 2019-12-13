const User = require('./User')

exports.plugin = {
  name: 'controllers',
  version: '1.0.0',
  register: async (server, options) => {
    try {
      // child controllers
      await server.register([
        User
      ], options)

      server.log('controllers', 'loaded')

    } catch (e) {
      server.log(['error', 'controllers'], e.message)
      throw e
    }
  }
}
