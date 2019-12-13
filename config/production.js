const Path = require('path')

const getConfig = () => ({
  server: {
    app: {
      environment: 'production',
      hostname: process.env.HOSTNAME
    },
    debug: {
      log: ['error'],
      request: ['error']
    },
    port: process.env.PORT,
    routes: {
      cors: true
    }
  },
  register: {
    plugins: [
      {
        plugin: require('inert')
      }
    ]
  }
})

module.exports = getConfig()
